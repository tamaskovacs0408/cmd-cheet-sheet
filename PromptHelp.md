# Prompt technikák, SDD + példák

## Alap promptolási technikák

- Zero‑shot prompting: nincs példa, csak egy jól megfogalmazott instrukció („Kérlek, csináld X‑et Y formátumban”).[^2][^4]
- Few‑shot prompting: néhány jó példa (input→output) mutatja a modelltől várt stílust, formátumot, gondolkodásmódot.[^7][^4][^2]
- Chain‑of‑thought (CoT): megkéred a modellt, hogy lépésről lépésre indokolja a gondolatmenetét („gondolkodj hangosan”), ami javítja a komplex feladatok pontosságát.[^4][^2]
- Least‑to‑most prompting: a problémát először kisebb részekre bontod, majd a modellt ezekre a részfeladatokra kérdezed, és az eredményeket összefűzöd.[^8]
- Self‑ask / self‑consistency: a modell saját magának tesz fel részkérdéseket, illetve több független futásból „szavazással” választod ki a legkonzisztensebb eredményt.[^9][^8]
- Role / persona prompting: „Te egy senior backend architect vagy…” – ezzel keretezed a szerepet, felelősségi kört és a válasz stílusát.[^4][^9]
- Meta‑prompting: a prompt arról szól, hogyan promptoljon saját magának a modell (pl. „Először készíts kérdéslistát, aztán válaszolj rájuk”).[^8][^4]

Ezeket a technikákat a legtöbb iparági útmutató hasonló kategóriákba rendezi, és főleg pontosság, robusztusság, valamint interpretálhatóság javítására használják.[^10][^2][^4]

## Mi a Spec Driven Development lényege prompt szempontból?

Spec Driven Developmentnél a specifikáció az elsődleges artefaktum, a kód és az AI‑hívások csak ennek derivátumai; a specifikáció a „single source of truth”.[^11][^12]
Az SDD gyakorlati tapasztalatok szerint akkor működik jól LLM‑ekkel, ha a spec nem csak adathalmaz, hanem egyfajta kötelező erejű „szerződés”, amelyet a prompt is egyértelműen így keretez.[^13][^11]

Kutatások és esettanulmányok azt mutatják, hogy a természetes nyelvű, autoritatív spec‑prompt gyakran jobb, mint a túlzottan JSON‑os, „gép‑olvasású” változat, ha a cél a megértés és a helyes implementáció.[^13]
Ugyanakkor az output oldalon a szigorú, gépbarát séma (JSON/YAML) sokkal stabilabb pipeline‑t ad, mint a szabad szöveg.[^3][^14]

## Ajánlott prompttechnikák SDD‑hez

SDD‑ben a promptolást érdemes a következő pillérek köré szervezni:

- „Spec‑mint‑szerződés” rendszerüzenet
  - A system / developer promptban egy rövid, de szigorú contract: szerep, scope, mit szabad, mit nem, milyen spec‑részeket tekintsen kötelezőnek, milyen formátumban válaszolhat.[^15][^3]
  - Ezt a contractot verziózni érdemes (v1, v2…), és minden futásban ugyanúgy használni, mintha egy API szerződést tartanál karban.[^14][^3]
- Spec‑szeletelés és chunk‑olt context
  - Nem az egész, több ezer soros specet adod oda, hanem mindig csak az adott feladathoz releváns rész(eke)t: pl. „API contract + error‑handling fejezet”, vagy „UI‑flow + state‑diagram szekció”.[^11][^1]
  - Ez csökkenti a tokeneket, és egyben csökkenti a „hallucinációt”: kevesebb felesleges, ellentmondó információ van a contextben.[^6][^1]
- Few‑shot példák: „jó” vs „rossz” implementáció–részletek
  - Nem kell mindenre sok példa, de 1–2 jól kiválasztott spec‑részlet + hozzá tartozó jó kódrészlet, teszt vagy design doksi rengeteget segít a modelnek.[^2][^4]
  - Esettanulmány alapján a jól megválasztott példák többet számítanak, mint a nyers mennyiség.[^10][^9]
- Külön CoT a tervezésre, nem a végső outputban
  - A tervezési lépésnél (pl. high‑level arch, API‑design) megengedheted a chain‑of‑thought gondolatmenetet, de utána egy második hívásban kéred a tiszta, strukturált artefaktumot (spec, kód, diagram).[^2][^4]
  - Így a végső output tömör marad, a „gondolkodás” pedig nem zabálja a tokeneket a további lépésekben.[^1][^5]


## Mi az a context engineering, és hogyan kapcsolódik ehhez?

Context engineering: nem csak a promptot (instrukciót) tervezed, hanem az egész context‑ablakot – mi kerüljön bele (spec‑részletek, retrieval, history, tool‑output), és mi maradjon ki.[^15][^1]
Modern gyakorlat szerint a sikeres LLM‑rendszerek inkább a context‑curationban különböznek egymástól, mint a „menő egy‑soros promtokban”.[^6][^1]

Néhány bevált context‑engineering technika:

- Single‑block prompt:
  - Chat‑üzenetek tucatjai helyett egy sűrű, jól tagolt blokk (pl. YAML vagy markdown szekciók: ROLE, TASK, SPEC, EXAMPLES, OUTPUT_SCHEMA, CONSTRAINTS).[^1][^15]
  - Ez sűrűbb információt ad tokenenként, és determinisztikusabban parse‑olható.[^1]
- Window‑packing:
  - Több kicsi, hasonló feladatot (pl. 10 endpointhoz hasonló unit test generálása) egy promptban összevonva adsz be, majd utólag szétbontod a válaszokat.[^1]
  - Ezzel nagyságrendekkel javítható a throughput anélkül, hogy minőségben nagyot vesztenél.[^1]
- Hierarchikus summarization:
  - Hosszabb beszélgetést, iterációt időnként „jegyzőkönyvvé” tömörítesz, és csak ezt a kivonatot tartod tovább a contextben, nem az összes korábbi turn‑t.[^15][^1]
  - Ez különösen fontos, ha ugyanazon projekten dolgozol sok körön keresztül.[^6][^15]
- Bounded evidence \& prompt‑size heuristics:
  - Először csak a minimálisan szükséges spec‑részletet és adatot adod, és csak akkor húzol be több dokumentumot (RAG), ha tényleg kell.[^3][^1]
  - A cél nem a tokenek minimalizálása önmagában, hanem a „dollar per validated action” csökkentése – azaz, mennyibe kerül egy olyan output, amit tényleg elfogadsz és nem kell újrafuttatni.[^3]


## Tokenhatékony promptolás SDD + context‑flow esetén

### 1. Spec struktúra és szeletelés

- Tarts egy embernek szóló, részletes specet (pl. Notion/Confluence), de a modellnek mindig csak „snippetet” adj belőle:
  - PURPOSE / GOAL
  - FUNCTIONAL REQUIREMENTS
  - DATA CONTRACTS / SCHEMAS
  - NON‑FUNCTIONAL CONSTRAINTS
  - EXAMPLES / EDGE CASES (ha kell)[^14][^11]
- Ezeket ID‑vel, verzióval látod el (spec_v3.api_contract, spec_v3.ui_flow), és a promptban csak hivatkozol rájuk + bemásolod az adott szelet tartalmát.[^11][^3]
- Így elkerülöd, hogy minden híváskor az egész projekt‑spec bekerüljön a contextbe.[^6][^1]


### 2. Prompt‑minta egy tipikus SDD lépésre

Példa egy „code‑gen from spec” hívás logikájára (nem konkrét szöveg, hanem mintázat):

- System / developer:
  - Szerep: „Te egy senior X fejlesztő vagy…”
  - Contract: csak az adott spec‑rész tartalma alapján dolgozhatsz, ne találj ki új endpointot, ne változtasd meg a szerződéseket, output formátum = STRICT_JSON, nincs magyarázat, nincs extra komment.[^3][^15]
- User:
  - TASK: egyetlen világos kérés: „Generálj implementációt ehhez az endpoint‑hoz…”
  - SPEC_SNIPPET: csak a releváns fejezetek (API contract + error handling + security).[^11][^1]
  - OPTIONAL_EXAMPLES: ha van 1–2 már meglévő endpoint implementáció mintaként.[^4][^2]

Token spórolás:

- Nem ismétled minden hívásban a teljes specet és minden globális szabályt – ami fix, az a system promptban marad.[^3][^1]
- A user‑üzenet csak a variábilis részeket tartalmazza (konkrét endpoint, konkrét komponens).[^1]


### 3. CoT és debug flow szétválasztása

- Ha tervezni kell (pl. architektúra, modul‑bontás), akkor egy külön „analysis” hívásban kéred a chain‑of‑thought jellegű választ; ilyenkor a tokenekbe „belefér”, mert ez egyszer történik nagy lépések előtt.[^2][^4]
- A tényleges kód / teszt / konfiguráció generálása már egy második hívás, ahol szigorú formátumot kérsz, és tilos a magyarázó szöveg, CoT, „thinking” – így rövidebb lesz az output, olcsóbb a következő kör.[^5][^1]


### 4. Kontextus tömörítés és historika

Hosszabb flow‑knál:

- Időnként kérd meg a modellt, hogy foglalja össze 5–10 bulletben, hol tart a projekt, milyen döntések születtek, milyen TODO‑k maradtak.[^15][^1]
- A következő hívásoknál már csak ezt a „meeting minutes” jellegű kivonatot teszed be, nem a teljes historyt.[^1]
- Így a „memória” megmarad, de a token‑költség kontrollálható marad.[^6][^1]


### 5. Mérd, ne tippeld: token‑ és minőség‑mérés

Context‑engineeringes anyagok kiemelik, hogy e nélkül könnyű „túlpromptolni” (mindenre plusz szöveg, redundáns szabályok).[^5][^3]

Érdemes:

- Logolni per workflow:
  - input tokenek,
  - output tokenek,
  - hány kör kellett elfogadható eredményig.[^5][^3]
- A/B tesztelni:
  - Ugyanazt a feladatot „bőbeszédű” és „tömör”, jobban strukturált prompttal lefuttatni, és nézni, melyik ad kevesebb re‑run‑t és kevesebb manuális javítást.[^3][^1]


## Mini „cheat sheet” SDD + context engineeringhez

- Gondolkodj spec‑ben, ne promptban: a prompt csak a spec szelete + contract + kérés.[^12][^11]
- Tartsd a system promptot rövid, de autoritatív szerződésként; verziózd, mint a kódot.[^14][^3]
- Minden hívásban csak a releváns spec‑szeletet add oda, ne az egész dokumentumot.[^6][^1]
- Tervezéshez CoT, implementációhoz szigorú, CoT‑mentes JSON/YAML output.[^4][^2][^3]
- Használj few‑shot példákat, de inkább kevés, nagyon jó példát, mint sok közepeset.[^10][^2]
- Compresseld a historyt rövid jegyzőkönyvvé, és ezt vidd tovább, ne az összes turn‑t.[^15][^1]
- Mérd a „dollar per validated action” mutatót: mennyibe kerül egy olyan output, amit tényleg elfogadsz; ha ez csökken, jó irányba mész.[^3]

## Példák

Az alábbiakban **copy-paste-ready** prompt sablonokat találsz mindkét területhez – először az SDD-specifikus technikákhoz, majd a tokenhatékony context engineering flow-hoz.

## SDD Spec-mint-Szerződés – System Prompt sablon
Ez a system prompt minden SDD-hívás alapja; verziózd, mint a kódot.

text
ROLE:
You are a senior backend engineer working strictly within the boundaries
of the provided specification. You do not invent new endpoints, schemas,
or behaviors not listed in the spec.

CONTRACT:
- Only use what is defined in SPEC_SNIPPET below.
- Never add extra fields, methods, or error codes not in the spec.
- Output format: STRICT JSON — no prose, no markdown, no comments.
- If something is ambiguous, output { "clarification_needed": "<question>" }
  instead of guessing.

SPEC VERSION: spec_v3.api_contract

## 1\. Spec-generálás promptja (CoT megengedett)
Ez egy „tervezési hívás" – itt megengedhető a gondolkodás.

text
TASK: Generate a functional specification for the following feature.

FEATURE DESCRIPTION:
{{Rövid, 2-5 mondatos leírás a funkcióról}}

EXISTING SYSTEM CONTEXT:
- Stack: {{pl. Node.js, PostgreSQL, REST API}}
- Related modules: {{pl. User Authentication, Billing}}
- Constraints: {{pl. GDPR-compliant, max 200ms response time}}

THINK STEP BY STEP:
1\. List the functional requirements.
2\. Define the data contracts (request/response schemas).
3\. Identify edge cases and error scenarios.
4\. List non-functional requirements.

OUTPUT FORMAT:
## Functional Requirements
## Data Contracts
## Edge Cases
## Non-Functional Requirements

## 2\. Kód-generálás specből (CoT TILOS – szigorú output)
Ez egy „implementációs hívás" – tömör, strukturált output kell.

text
TASK: Implement the following API endpoint based on the spec below.
No explanations. No comments. Code only.

SPEC_SNIPPET:
---
Endpoint: POST /api/v1/invoices
Auth: Bearer token required
Request body:
  {
    "client_id": "uuid",
    "items": [{ "description": "string", "amount": "number" }],
    "due_date": "ISO8601"
  }
Response 201:
  { "invoice_id": "uuid", "status": "pending" }
Response 400:
  { "error": "VALIDATION_ERROR", "details": "string" }
Response 401:
  { "error": "UNAUTHORIZED" }
---

CONSTRAINTS:
- Use Express.js + Zod for validation
- Use the existing InvoiceRepository.create() method
- Do not add any fields not in the spec

OUTPUT: Single TypeScript function, export default.

## 3\. Teszt-generálás specből (few-shot példával)

text
TASK: Generate unit tests for the endpoint below.

SPEC_SNIPPET:
{{Ugyanaz a spec, amit fentebb a kód-generálásnál használtál}}

EXAMPLE TEST (use this style):
---
it('returns 201 with invoice_id on valid input', async () => {
  const res = await request(app)
    .post('/api/v1/invoices')
    .set('Authorization', 'Bearer valid_token')
    .send({ client_id: 'uuid-1', items: [...], due_date: '2026-06-01' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('invoice_id');
});
---

COVER THESE CASES: 201 success, 400 missing field, 400 invalid type, 401 no token.

OUTPUT FORMAT: Jest test file, no imports (assume already imported).

## 4\. Few-shot: „jó" vs „rossz" implementáció
Akkor használd, ha a modell újra és újra rossz mintát követ.

text
TASK: Implement error handling for the service layer.

GOOD EXAMPLE:
// Correct: throws domain error, not raw DB error
async function getUser(id: string) {
  try {
    return await db.users.findById(id);
  } catch (e) {
    throw new DomainError('USER_NOT_FOUND', { id });
  }
}

BAD EXAMPLE (do NOT do this):
// Wrong: leaks DB error to caller
async function getUser(id: string) {
  return await db.users.findById(id); // no try/catch
}

NOW IMPLEMENT: {{Konkrét metódus neve és spec-je}}

## Tokenhatékony context flow sablonok

## 5\. Window-packing – Több feladat egy hívásban
Akkor használd, ha 5-10 hasonló feladatod van (pl. több endpoint).

text
TASK: Implement all 3 endpoints below in a single response.
Each endpoint is independent. Return them in the same JSON structure.

GLOBAL CONSTRAINTS (apply to all):
- Express.js + TypeScript
- Auth: Bearer token on all routes
- Error format: { "error": "CODE", "details": "string" }

ENDPOINTS:

[1] POST /api/v1/clients
  Request: { "name": "string", "email": "email" }
  Response 201: { "client_id": "uuid" }

[2] GET /api/v1/clients/:id
  Response 200: { "client_id": "uuid", "name": "string", "email": "string" }
  Response 404: { "error": "NOT_FOUND" }

[3] DELETE /api/v1/clients/:id
  Response 204: (empty)
  Response 404: { "error": "NOT_FOUND" }

OUTPUT FORMAT:
{
  "endpoint_1": "<code>",
  "endpoint_2": "<code>",
  "endpoint_3": "<code>"
}

## 6\. Hierarchikus history-tömörítés (összefoglaló kérés)
Hosszú session végén futtasd ezt, és a kimenetet vidd tovább – ne a teljes historyt.

text
TASK: Summarize this session as a concise project snapshot.

OUTPUT FORMAT (strict):
## Decisions Made
- (bullet list, max 10 items)

## Components Implemented
- (module name + one-line description)

## Open TODOs
- (bullet list, max 10 items)

## Active Spec Version
- (spec ID and version)

## Known Constraints / Gotchas
- (bullet list, max 5 items)

Keep the total output under 300 words.

## 7\. Bounded evidence – RAG-szerű spec-betöltés
Ha nagy speced van, ezt a mintát kövesd: előbb kérdezd meg, mire van szükség.

text
STEP 1 — Identify needed sections (cheap call):

TASK: I need to implement the "invoice PDF generation" feature.
Which sections of the spec are relevant?
Available sections: [api_contract, auth, pdf_templates,
                     error_codes, billing, notifications]

Answer with a JSON list of section names only.
No explanation.
---

STEP 2 — Betöltöd csak a visszaadott szekciókat, és futtatod
         a tényleges implementációs hívást (ld. sablon #2).

## Gyors döntési sablon: melyik technikát mikor?

| **Feladat** | **Technika** | **CoT?** | **Output** |
|:-:|:-:|:-:|:-:|
| Feature spec írás | Meta-prompting + CoT | ✅ igen | Markdown szekciók |
| Kód generálás specből | Spec-contract + few-shot | ❌ nem | Csak kód |
| Teszt generálás | Few-shot (jó példa) | ❌ nem | Jest fájl |
| Több hasonló feladat | Window-packing | ❌ nem | JSON map |
| Hosszú session lezárása | History compression | – | 300 szavas snapshot |
| Nagy spec betöltése | Bounded evidence (2 lépés) | – | Csak releváns szekció |
A legfontosabb elv: **tervezésnél engedj gondolkodást, implementációnál ne** – ez egyetlen szabályként a legtöbb token-pazarlást megakadályozza, és közben megőrzi a kimenet minőségét.
## Github Copilot

Röviden: a VS Code‑os Copilot módok (Ask / Plan / Agent) **nem írják felül** az SDD‑s és context‑engineeringes elveket, csak keretet adnak hozzájuk – a lényeg ugyanaz, de más módot érdemes használni tervezésre (Plan), implementálásra (Agent) és tisztázásra (Ask).devblogs.microsoft+2
# Mit csinál az Ask / Plan / Agent mód SDD szempontból?
* **Ask mód**: Q&A/chat – nem (vagy csak minimálisan) nyúl a workspace‑hez, inkább magyaráz, példát ad, koncepciót tisztáz.github+2
* **Plan mód**: dedikált tervező üzemmód – először kontextust gyűjt, majd lépésről‑lépésre tervet készít, amit jóváhagysz, mielőtt bármilyen implementáció történik; a tervet külön „plan” artefaktumba is lementi.thinkaboutit+1
* **Agent mód**: félig autonóm ügynök – bejárja a repo‑t, olvas fájlokat, parancsokat futtat, kódot módosít, multi‑step feladatokat hajt végre a cél érdekében.codemag+2

⠀A hivatalos és közösségi anyagok is úgy írják le, hogy a módok **autonómia/fókusz szintet** szabályoznak (megértés vs. tervezés vs. tényleges kódmódosítás), nem pedig teljesen más „promptnyelvet” igényelnek.linkedin+2
# Hogyan ültesd át az SDD‑s flow‑t ezekre a módokra?
# 1\. Ask mód – tisztázás, reverse engineering, „spec discovery”
SDD‑ben Ask mód ideális, ha:
* meglévő kódot próbálsz spec‑ké visszafejteni („mit csinál ez a modul pontosan?”),
* architektúra‑variánsokról kérdezel,
* edge case‑eket, tradeoffokat akarsz megérteni.learn.microsoft+1

⠀Tipikus SDD‑stílusú Ask prompt:
„Ask: Nézd meg ezt a fájlt, és foglald össze funkcionális specifikációként: milyen inputot vár, milyen outputot ad, milyen hibákat dob, milyen edge case‑ek vannak. Kérlek, Markdown szekciókban add vissza (Functional Requirements / Data Contracts / Edge Cases).”


Itt ugyanazt a „spec‑mint‑artefaktum” gondolkodást használod, mint korábban, csak nem kódot kérsz, hanem **specet** a meglévő kódból.code.visualstudio+1
# 2\. Plan mód – a CoT/tervezési fázisod Copilot‑os megfelelője
Plan mód gyakorlatilag az a „külön analízis hívás”, amit korábban javasoltam CoT‑ra: itt gondolkodjon, struktúráljon, ne implementáljon.thinkaboutit+1
Így illeszkedik SDD‑hez:
* Ide jók az olyan promptok, hogy: „Írj részletes megvalósítási tervet erre az új REST endpoint csomagra az alábbi spec alapján”,
* Kimenetként kapsz egy **konkrét, több lépéses tervet** (todo lista), amit átnézhetsz, pontosíthatsz – ez lesz a „mini‑spec” az implementációs fázisra.~[code.visualstudio](https://code.visualstudio.com/docs/copilot/agents/planning)~
* A VS Code‑os Plan agent eleve úgy van tervezve, hogy **explicit artefaktumot** gyárt (plan.md), ezt simán tekintheted SDD‑ben egy verziózott implementációs specnek.thinkaboutit+1

⠀Itt tehát ugyanazt csinálod, mint a kézi SDD‑s „planning call”-nál: kérsz funkcionális bontást, lépéslistát, acceptance criteriákat – csak most ezt **Plan módban** hívod meg, hogy ne kezdjen el rögtön kódot átírni.code.visualstudio+1
# 3\. Agent mód – az implementációs fázis, szigorúbb keretekkel
Agent módban Copilot már ténylegesen:
* olvas és módosít több fájlt,
* refaktorál, tesztet generál, parancsokat futtat,
* komplex, több lépéses feladatokat hajt végre.github+2

⠀SDD‑szemmel nézve ez pontosan az a fázis, ahol korábban „kód‑generálás specből” promptokat írtál – csak most az „agentet” kell **szigorúan spec‑hez kötni**:
* mondd meg neki, hogy **melyik plan/spec‑re támaszkodjon** (pl. „Kövesd a plan.md‑ben lévő tervet”),
* szűkítsd a scope‑ot: „Csak a /services/invoices és /routes/invoices fájlokon dolgozhatsz.”,
* tiltsd vagy limitáld az automatikus refaktort olyan modulokra, amelyek nincsenek a scope‑ban.linkedin+2

⠀Gyakorlati minta SDD‑hez:
„Agent: A plan.md‑ben lévő terv alapján valósítsd meg az új POST /api/v1/invoices endpointot. Csak a routes/invoices.ts és services/invoices.ts fájlokat módosítsd. Ne változtasd meg a meglévő endpointok viselkedését. Ha bármi nem egyértelmű a spec-ben, állj meg, és kérdezz rá a chatben.”


Ez ugyanaz a gondolkodás, mint amikor rendszer‑promptban „spec‑mint‑szerződés” logikát írtál, csak most ezt **Agent módhoz igazítod**, ahol nagyobb a szabadság.github+1
# Tokenhatékonyság és context engineering Copilot módokkal
# Ask módban
* A hivatalos leírás szerint Ask főleg a promptban/aktuális fájlban kapott kontextussal dolgozik, nem futtat nagy workspace‑bejárást.devblogs.microsoft+1
* Token‑szinten itt te irányítasz:
  * ne dumpold be a teljes specet, csak a releváns blokkot vagy kijelölést,
  * kérj **rövid, strukturált** kimenetet (fix headingek, max X bullet stb.).github+1

⠀Plan módban
* A Plan agent automatikusan kontextust gyűjt, tervet készít, és azt külön fájlban (plan.md) tárolja; ezzel gyakorlatilag a „hierarchikus summary / meeting minutes” mintát kapod ingyen.github+1
* Tokenhatékonyság szempontból:
  * elég egyszer „drága” tervező hívást csinálni Plan módban,
  * utána Agent‑nek már csak magát a tervet + releváns spec‑részleteket kell odaadni, nem az egész előtörténetet.github+2

⠀Agent módban
* Agent módban a teljes repo, dokumentáció, konfig is kontextus lehet, ezért **különösen fontos a repo‑szintű context engineering**: jó README, jól strukturált spec fájlok, file‑szintű docstringek.linkedin+2
* Token‑takarékos trükkök:
  * dolgoztass **kijelöléssel** (csak adott blokkra kérsz módosítást),
  * explicit sorold fel, mely fájlokat nézheti/módosíthatja, ezzel elkerülöd, hogy feleslegesen túrjon az egész monorepóban,
  * nagy feladatnál előbb Plan mód, és az ott keletkező tervet eteted be Agentnek, nem a teljes szabad szövegű megbeszélést.devblogs.microsoft+2

⠀A Microsoft/ GitHub anyagai is azt hangsúlyozzák, hogy a Copilotból akkor jön ki a legtöbb érték, ha **tudatosan menedzseled, mi kerül a context ablakba** (strukturált specifikáció, központosított dokumentumok, releváns fájlok), nem pedig mindent egyszerre próbálsz „beleönteni”.github+2
# Gyakorlati „routing”: mikor melyik mód?
Egy tipikus SDD + context‑flow nálad így nézhet ki VS Code‑ban:
1. **Ask mód**
   * régi kód megértése,
   * „reverse spec” készítése,
   * alternatív designok összevetése.learn.microsoft+1
2. **Plan mód**
   * új feature / refaktor részletes tervének generálása a már létező high‑level spec alapján,
   * acceptance criteria, TODO lista, érintett modulok listája.thinkaboutit+1
3. **Agent mód**
   * a jóváhagyott terv végrehajtása szűkített scope‑ban,
   * implementáció, tesztek, kisebb refaktorok – mindig explicit hivatkozással a spec/plan fájlokra.codemag+2

⠀Tehát a válasz a kérdésedre: **nem kell teljesen másképp promptolnod**, inkább ugyanazt a SDD‑/context‑engineering szemléletet térképezed rá a Copilot módjaira –
* gondolkodás és spec → Plan (és/vagy Ask),
* végrehajtás/kódmódosítás → Agent,
* gyors tisztázás → Ask.devblogs.microsoft+2

⠀Ha szeretnéd, a következő körben írhatok konkrét, magyar Copilot‑chat prompt példákat mindhárom módra, SDD‑s „spec→plan→implement” pipeline‑ra optimalizálva.
