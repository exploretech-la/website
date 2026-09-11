#!/usr/bin/env node
/**
 * Cross-record integrity check for the authored content in `src/content`.
 *
 * TypeScript already proves the shape of this data. This checks the things a
 * type cannot: that a team assignment names a person who exists, that nobody
 * appears twice in one team or twice in the registry, that imported images and
 * documents exist on disk, that outbound links are well-formed and unique, and
 * that archived videos carry a bare YouTube id.
 *
 * Remote URLs are checked for syntax only. Nothing here makes a network
 * request, so a live-but-dead external link still passes.
 *
 *   node scripts/content-check.mjs
 *
 * Content modules import optimized images, so Vite loads them exactly the way
 * the app does; a broken asset import fails here instead of at build time.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const problems = [];
const report = (where, message) => problems.push(`${where}: ${message}`);

/** Reject unusable link targets, and prove bundled assets exist. */
function checkUrl(where, value, { local = false } = {}) {
  if (value.trim() === "") return report(where, "URL is empty");
  if (value.startsWith("data:")) return;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    let parsed;
    try {
      parsed = new URL(value);
    } catch {
      return report(where, `not a valid URL: ${value}`);
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return report(where, `unsupported URL scheme: ${value}`);
    }
    if (local)
      report(
        where,
        `expected a bundled asset import, got a remote URL: ${value}`,
      );
    return;
  }
  if (!value.startsWith("/")) {
    return report(
      where,
      `expected an imported asset or absolute URL, got: ${value}`,
    );
  }
  // Vite serves imported assets from `/src/...` (or `/@fs/<abs>`) in the graph
  // this checker loads, and from `/static/media/...` in a build.
  const clean = value.split(/[?#]/)[0];
  if (!clean.startsWith("/src/") && !clean.startsWith("/@fs/")) return;
  const onDisk = clean.startsWith("/@fs/")
    ? clean.slice(4)
    : path.join(repoRoot, clean);
  if (!fs.existsSync(onDisk)) report(where, `asset does not exist: ${value}`);
}

/** Document links: usable target, visible text, no repeated target in one list. */
function checkLinks(where, links, options) {
  const seen = new Map();
  links.forEach((link, index) => {
    const at = `${where}[${index}]`;
    if (link.name.trim() === "")
      report(at, "name is empty; it is the visible link text");
    checkUrl(`${at}.src`, link.src, options);
    if (seen.has(link.src))
      report(at, `same target as ${where}[${seen.get(link.src)}]`);
    else seen.set(link.src, index);
  });
}

function checkPeople(people) {
  const byName = new Map();
  const byLink = new Map();
  for (const [id, person] of Object.entries(people)) {
    const where = `people["${id}"]`;
    if (person.name.trim() === "") report(where, "name is empty");
    const twin = byName.get(person.name);
    if (twin)
      report(
        where,
        `duplicate profile: "${person.name}" is also people["${twin}"]`,
      );
    else byName.set(person.name, id);

    if (person.image !== undefined)
      checkUrl(`${where}.image`, person.image, { local: true });
    if (person.link !== undefined) {
      checkUrl(`${where}.link`, person.link);
      const shared = byLink.get(person.link);
      if (shared)
        report(
          where,
          `profile link duplicates people["${shared}"]: ${person.link}`,
        );
      else byLink.set(person.link, id);
    }
    person.descriptions?.forEach((text, index) => {
      if (text.trim() === "")
        report(`${where}.descriptions[${index}]`, "is empty");
    });
  }
}

function checkRoles(members, where, people, referenced) {
  const seen = new Set();
  for (const [index, member] of members.entries()) {
    const at = `${where}[${index}]`;
    if (!Object.hasOwn(people, member.personId)) {
      report(at, `personId "${member.personId}" is not in the people registry`);
    } else {
      referenced.add(member.personId);
      if (seen.has(member.personId))
        report(at, `"${member.personId}" is already listed here`);
      seen.add(member.personId);
    }
    if (member.title.trim() === "")
      report(at, "title is empty; it is the role on the card");
  }
}

function checkTeams(teamSections, people, pastSpeakers) {
  const referenced = new Set();
  const sectionIds = new Set();
  for (const section of teamSections) {
    const where = `teamSections["${section.id}"]`;
    if (sectionIds.has(section.id)) report(where, "duplicate section id");
    sectionIds.add(section.id);
    if (section.navLabel.trim() === "" || section.heading.trim() === "") {
      report(where, "navLabel and heading must be non-empty");
    }
    checkRoles(section.members, `${where}.members`, people, referenced);
  }
  checkRoles(pastSpeakers, "pastSpeakers", people, referenced);
  for (const id of Object.keys(people)) {
    if (!referenced.has(id))
      report(`people["${id}"]`, "has no team or speaker assignment");
  }
}

function checkEvent(year, event) {
  const where = `EVENTS["${year}"]`;
  if (event.year !== year)
    report(where, `year field "${event.year}" does not match its key`);
  checkUrl(`${where}.programHref`, event.programHref);
  checkLinks(`${where}.maps`, event.maps, { local: true });
  if (event.waivers)
    checkLinks(`${where}.waivers`, event.waivers, { local: true });
  if (event.wristbandImage) {
    checkUrl(`${where}.wristbandImage.src`, event.wristbandImage.src, {
      local: true,
    });
  }
  if (event.feedback.kind === "link")
    checkUrl(`${where}.feedback.href`, event.feedback.href);

  const scheduleKeys = new Set();
  for (const entry of event.schedule) {
    if (scheduleKeys.has(entry.key))
      report(where, `duplicate schedule key ${entry.key}`);
    scheduleKeys.add(entry.key);
    if (entry.name.trim() === "" || entry.time.trim() === "") {
      report(
        `${where}.schedule[${entry.key}]`,
        "time and name must be non-empty",
      );
    }
  }

  const titles = new Set();
  const embedIds = new Set();
  for (const section of event.workshops) {
    for (const card of section.cards) {
      const at = `${where} "${card.title}"`;
      if (card.title.trim() === "")
        report(where, "a workshop card has no title");
      else if (titles.has(card.title))
        report(at, "duplicate workshop title in this event");
      titles.add(card.title);
      checkLinks(`${at} links`, card.links);
      if (card.kind !== "archivedVideo") continue;
      if (!/^[A-Za-z0-9_-]{6,}$/.test(card.embedId)) {
        report(at, `embedId must be a bare YouTube id, got "${card.embedId}"`);
      } else if (embedIds.has(card.embedId)) {
        report(at, `embedId "${card.embedId}" is used by another card`);
      }
      embedIds.add(card.embedId);
    }
  }

  if (event.faq) {
    const keys = new Set(event.faq.items.map((item) => item.key));
    if (keys.size !== event.faq.items.length)
      report(`${where}.faq`, "duplicate FAQ keys");
    if (
      event.faq.initialOpenKey !== null &&
      !keys.has(event.faq.initialOpenKey)
    ) {
      report(
        `${where}.faq.initialOpenKey`,
        `${event.faq.initialOpenKey} matches no entry`,
      );
    }
    for (const item of event.faq.items) {
      if (item.question.trim() === "" || item.answer.trim() === "") {
        report(
          `${where}.faq[${item.key}]`,
          "question and answer must be non-empty",
        );
      }
    }
  }
}

function checkEvents(events, eventRoutes, registration) {
  for (const [year, event] of Object.entries(events)) checkEvent(year, event);

  // EVENT_ROUTES drives both the router and the Resources menu, so a repeated
  // path or label would silently shadow a published year.
  const routes = new Set();
  const labels = new Set();
  const covered = new Set();
  for (const { route, year, navLabel } of eventRoutes) {
    if (routes.has(route)) report("EVENT_ROUTES", `duplicate route "${route}"`);
    routes.add(route);
    if (!route.startsWith("/"))
      report("EVENT_ROUTES", `route "${route}" is not an absolute path`);
    if (navLabel.trim() === "")
      report("EVENT_ROUTES", `"${route}" has no menu label`);
    else if (labels.has(navLabel))
      report("EVENT_ROUTES", `duplicate menu label "${navLabel}"`);
    labels.add(navLabel);
    if (!Object.hasOwn(events, year))
      report("EVENT_ROUTES", `"${route}" names unknown year ${year}`);
    covered.add(year);
  }
  for (const year of Object.keys(events)) {
    if (!covered.has(year))
      report(`EVENTS["${year}"]`, "no EVENT_ROUTES entry reaches it");
  }

  if (!registration.alert.to.startsWith("/")) {
    report(
      "REGISTRATION_2021.alert.to",
      `must be an in-app route, got "${registration.alert.to}"`,
    );
  }
  for (const [field, value] of Object.entries(registration.importantLinks)) {
    if (Array.isArray(value))
      checkLinks(`REGISTRATION_2021.importantLinks.${field}`, value);
    else if (value?.src)
      checkUrl(`REGISTRATION_2021.importantLinks.${field}.src`, value.src);
  }
  checkLinks("REGISTRATION_2021.waivers.forms", registration.waivers.forms, {
    local: true,
  });
  // The combined-forms link is an external short URL, not a bundled PDF.
  checkUrl(
    "REGISTRATION_2021.waivers.allForms.src",
    registration.waivers.allForms.src,
  );
}

async function loadContent() {
  const { createServer } = await import("vite");
  // The project config gives the same resolution the app and build use, so a
  // module that loads here loads there.
  const server = await createServer({
    root: repoRoot,
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true, watch: null, hmr: false },
    optimizeDeps: { noDiscovery: true },
  });
  try {
    // Sequential: a missing module reports itself instead of being buried
    // under the transport errors its siblings then raise.
    const { people } = await server.ssrLoadModule("/src/content/people.ts");
    const { teamSections } = await server.ssrLoadModule(
      "/src/content/teams.ts",
    );
    const { pastSpeakers } = await server.ssrLoadModule(
      "/src/content/speakers.ts",
    );
    const events = await server.ssrLoadModule("/src/content/events/index.ts");
    return { people, teamSections, pastSpeakers, ...events };
  } finally {
    await server.close();
  }
}

let content;
try {
  content = await loadContent();
} catch (error) {
  console.error("Could not load the content modules:");
  console.error(`  ${error?.message ?? error}`);
  process.exit(1);
}

checkPeople(content.people);
checkTeams(content.teamSections, content.people, content.pastSpeakers);
checkEvents(content.EVENTS, content.EVENT_ROUTES, content.REGISTRATION_2021);

if (problems.length > 0) {
  console.error(`Content check failed with ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(
  `Content check passed: ${Object.keys(content.people).length} people, ` +
    `${content.teamSections.length} team sections, ${Object.keys(content.EVENTS).length} events.`,
);
