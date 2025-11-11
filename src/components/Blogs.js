import "../blog.css";
import React, { useMemo, useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Input,
  List,
  Tag,
  Card,
  Space,
  Breadcrumb,
  Avatar,
  Divider,
  Affix,
  Anchor,
  Pagination,
  Tooltip,
  Button,
  Row,
  Col,
  Empty,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  FolderOpenOutlined,
  ShareAltOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";

const { useBreakpoint } = Grid;
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

// --- Mock content (2 posts) --------------------------------------------------
const POSTS = [
  {
    id: "1",
    title: "A Simple Measure of Policy Risk — What Markets Need to Know",
    slug: "polish-epu-index",
    author: "Alina Landowska",
    authorAvatar: null,
    date: "2025-08-26",
    category: "PL EPU Index",
    tags: ["PL EPU Index", "Policy Risk"],
    summary:
      "Polish EPU Index is a high-frequency indicator tracking how policy uncertainty in Poland rises and falls and how it spills into markets.",
    hero:
      "/blog1.1.png",
    readingTime: 8,
    body: (
      <>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          The Polish EPU Index is a high-frequency indicator that tracks how uncertainty
          around government policy in Poland rises and falls — and how that uncertainty
          spills into markets.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>How to read the Polish EPU Index</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>What it measures</Text> Built on the globally recognized <a href="https://www.policyuncertainty.com/index.html" target="_blank" rel="noopener noreferrer">
          EPU framework pioneered in the US</a> and extended worldwide, our index analyzes the share of newspaper coverage that links the <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>economy, policy</Text>, 
          and <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>uncertainty</Text>, then standardizes and aggregates the signal into an easy-to-use metric, updated daily, monthly, 
          quarterly and annually. Higher values mean policy risk is more prominent in the media narrative. 
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Baseline = 100</Text>. We normalize the index to 100 over the baseline (Jul 2022–Jun 2025).
        </Paragraph>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li>120 ≈ policy uncertainty 20% above the baseline.</li>
          <li>80 ≈ 20% below the baseline.</li>
        </ul>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>A practical yardstick</Text>: The historical standard deviation is ~18 points; readings ≥ 118 signal a 
          high-uncertainty regime, ≤ 82 a low-uncertainty regime.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Daily vs. monthly</Text>: Daily values are best for event monitoring (e.g., tax, regulation, elections). 
          Monthly/quarterly values suit planning, reporting, and board dashboards.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>What typically moves the index</Text>: Budget and tax policy, monetary policy decisions, large regulatory 
          changes, elections, and geopolitics when discussed through an economic-policy lens.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>What it means for business</Title>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>FX & pricing</Text>: Higher EPU is associated with złoty depreciation (EUR/PLN, USD/PLN), supporting earlier hedging or price reviews.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Equities & risk</Text>: Higher EPU coincides with weaker WIG20 and stronger demand for safe havens (gold)—useful for risk budgets and allocation.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Local signal</Text>: Correlation with VIX is weak, so the index captures domestic policy risk rather than global market noise.</li>
        </ul>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Good practice</Text>: Treat EPU as an early-warning indicator, not causality. Pair it with market data (e.g., FX, 
          rates, equities) and your own exposures. Sector-level indices (Finance & Insurance; Energy & Fuels; Construction & Infrastructure; 
          IT & Digital Services) are in development to make this even more actionable for your business.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>
          Why this matters for decision-makers
        </Title>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Currency & pricing</Text>: When policy uncertainty rises, the złoty tends to weaken. Poland’s EPU correlates strongly with <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>UR/PLN (+0.77)</Text>E and <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>USD/PLN (+0.62)</Text>—useful for hedging, pricing imports/exports, and treasury planning.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Risk & allocation</Text>: Uncertainty spikes go hand-in-hand with <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>lower equities (WIG20 −0.72)</Text> and <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>higher demand for safe havens (gold −0.86)</Text>—helpful for adjusting risk budgets and rebalancing.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>A local lens (not just global noise)</Text>: Poland’s EPU shows <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>little linkage to VIX index (0.09)</Text>, indicating it captures <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>domestic</Text> policy risk rather than global volatility chatter.</li>
        </ul>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>
          Coming next: sectoral Polish EPU indices
        </Title>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Finance & Insurance</Text></li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Energy & Fuels</Text></li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Construction & Infrastructure</Text></li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>IT & Digital Services</Text></li>
        </ul>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          These will help CFOs, CROs, and strategy teams align hedging, capex, and hiring plans with the specific policy currents that matter most to their industry.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>
          Get started
        </Title>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li>Explore charts and download <a href="https://epu-index.pl" target="_blank" rel="noopener noreferrer">data</a>.</li>
          <li>Use EPUI Poland as a trigger for FX hedging reviews, risk-budget adjustments, and scenario planning.</li>
          <li>Contact us to discuss custom dashboards or sectoral early-access.</li>
        </ul>
      </>
    ),
  },
  {
    id: "2",
    title: "What History Tells Us about PL EPU Index?",
    slug: "polish-epu-index",
    author: "Alina Landowska",
    authorAvatar: null,
    date: "2025-07-22",
    category: "Event-driven Uncertainty",
    tags: ["PL EPU Index", "Policy Risk"],
    summary:
      "The US EPU (daily) is highly event-driven and volatile, with sharp spikes around fiscal, monetary, and political episodes. Poland’s series is flatter and more stable over the recent window, suggesting either a steadier policy backdrop or tighter media focus on domestic issues.",
    hero:
      "/blog2.1.png",
    heroSource: "https://epu-index.pl/", 
    readingTime: 5,
    body: (
      <>
          <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <a href="https://fred.stlouisfed.org/series/USEPUINDXD" target="_blank" rel="noopener noreferrer">The US EPU (daily)</a> is highly event-driven and volatile, with sharp spikes around fiscal, monetary, and political episodes. Poland’s series is flatter and more stable over the recent window, suggesting either a steadier policy backdrop or tighter media focus on domestic issues.
          </Paragraph>
          <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Poland moves on Polish events.</Text> Over two decades of
            annotated history show that Poland’s EPU spikes around <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>domestic political
            and policy episodes</Text> and major regional shocks.
          </Paragraph>

          <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Poland’s EPU vs. US and Europe: weak co-movement.</Text> {" In recent comparisons, Poland’s aggregate EPU is flatter and lower than the US and Europe; it does not co-move with them in a statistically meaningful way (Europe r = –0.29, p > 0.05; US r = –0.68, p < 0.05). This suggests Poland’s index is picking up country-specific policy narratives rather than global risk rotations, an interpretation reinforced by the weak association with VIX in the same period."}
          </Paragraph>

          <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Domestic EPU beats external EPU in the FX channel.</Text>Using GARCH-type models on PLN/EUR, PLN/USD, and PLN/CHF, domestic policy uncertainty (Polish 
            EPU Index) has a positive, statistically significant effect on exchange-rate levels—i.e., higher local EPU → PLN depreciation. By contrast, external EPU measures 
            (global/US/Europe) are generally insignificant drivers for PLN, with limited exceptions (e.g., Germany news index in one EUR specification).
          </Paragraph>

          <Divider />

          <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>Key historic takeaways for business</Title>
          
          <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>FX hedging windows</Text>: Episodes like 2008–09, 2020, 2022, and 2023 elections show EPU surges alongside PLN pressure. Monitoring the Poland EPU 
            around fiscal packages, regulatory overhauls, and election cycles helps time hedge adjustments more effectively than watching global EPU alone.</li>
            <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Local > global</Text>: The weak/negative correlations with US/European EPU imply global indices are poor stand-ins for Poland’s policy risk; use the 
            Poland EPU for domestic exposures and treat US/Europe/Global as context only.</li>
            <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Event playbook</Text>: Expect elevated EPU (and FX sensitivity) around: budgets, tax reforms, monetary-policy inflection points, elections, and regionally proximate geopolitical shocks—patterns visible across the historic timeline.</li>

          </ul>

          <Divider />

          <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>Why you can trust the uncertainty signal</Title>

          <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Broader media corpus</Text>: The new Poland EPU broadens prior coverage from five to ~eleven national newspapers, improving editorial and regional representativeness and reducing single-outlet bias.
            </li>
            <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Standardized to the global EPU framework</Text>: It follows the BBD methodology (economy ∩ policy ∩ uncertainty in news text), with a recent standardization window (Jul 2022–Jun 2025) to better capture contemporary policy dynamics; results and comparisons are designed to integrate with the Global EPU (GEPU) ecosystem.
            </li>
            <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Robust FX evidence</Text>: Data analysis confirms the PLN-depreciation response to local EPU, robust across ARCH/GARCH/EGARCH specifications for PLN/EUR, PLN/USD, PLN/CHF—with external EPU mostly insignificant for Poland’s FX levels.
            </li>
          </ul>

          <Divider />

          <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>Bottom line</Title>
          <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>For the Polish market, policy risk is local</Text>. The Polish EPU Index captures the moments
            that matter for PLN, equities, and pricing decisions—while US and global
            indices provide useful background, they are not the main drivers of
            Polish FX dynamics. Keep the Poland EPU on your dashboard for hedging,
            risk budgeting, and scenario planning; use global EPU for context, not
            as a proxy.
          </Paragraph>

          <Divider />

          <Paragraph type="secondary" style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            Sources: <a href="" target="_blank" rel="noopener noreferrer">Poland’s Economic Policy Uncertainty Index: Construction and
            Empirical Analysis</a>; <a href="https://www.policyuncertainty.com/media/EPU_Poland.pdf" target="_blank" rel="noopener noreferrer">Local and External Economic Policy Uncertainty and
            Their Impact on Exchange Rates in Emerging Markets: Evidence from Poland</a>
          </Paragraph>
      </>
    ),
  },
  {
    id: "3",
    title: "What Europe’s Policy Risk Signals Tell Us — and Why Poland Looks Different",
    slug: "europe-poland-epu",
    author: "Alina Landowska",
    authorAvatar: null,
    date: "2025-08-29",
    category: "PL EPU Index",
    tags: ["Europe EPU", "PL EPU", "Policy Risk"],
    summary:
      "EPU indices show Europe’s risk landscape is fractured: Germany drives continental volatility, while Poland remains curiously calm.",
    hero: "/blog3.1.png",
    heroSource: "https://www.policyuncertainty.com/",
    readingTime: 10,
    body: (
      <>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Economic Policy Uncertainty (EPU) indices reveal a continent fractured by risk. While most of Europe moves in sync with global shocks, a stark 
          divide separates the core from the periphery. Germany, the EU's economic engine, has become its epicenter of volatility. Meanwhile, Poland displays 
          a baffling calm. This isn't just different data—it’s a story of two radically different economic realities.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Across <a href="https://fred.stlouisfed.org/series/FREUINDXM" target="_blank" rel="noopener noreferrer">France</a>, <a href="https://fred.stlouisfed.org/series/DEEPUINDXM" target="_blank" rel="noopener noreferrer">Germany</a>, <a href="https://fred.stlouisfed.org/series/SPEPUINDXM" target="_blank" rel="noopener noreferrer">Spain</a>, <a href="https://www.policyuncertainty.com/ireland_rice.html" target="_blank" rel="noopener noreferrer">Ireland</a>, <a href="https://fred.stlouisfed.org/series/ITEPUINDXMhttps://fred.stlouisfed.org/series/ITEPUINDXM" target="_blank" rel="noopener noreferrer">Italy</a>, and the <a href="https://fred.stlouisfed.org/series/UKEPUINDXM" target="_blank" rel="noopener noreferrer">UK</a>, 
          the EPU indices move broadly in sync with the Global EPU benchmark. But the amplitude of the swings varies:
        </Paragraph>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Germany dominates:</Text> spikes reach over 700 in early 2025, driven by coverage of fiscal rule debates, coalition negotiations, and the energy transition.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>France, Spain, Ireland, Italy:</Text> mid-range cluster, moving between 200–400, closely aligned with global cycles.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Poland and Greece:</Text> in contrast, remain among the lowest levels in Europe, rarely above 150.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>The UK:</Text> index is highly volatile, similar in behavior to the US index; spikes in 2022–2023 during the Truss government crisis, fiscal plan reversal, and BOE interventions; 
            spike over 800 in April 2025 is linked to election campaign rhetoric, tax/tariff debates, or global market tensions.
          </li>
        </ul>

        <Divider />
        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>Germany is Europe’s EPU Volatility Leader</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Germany’s EPU doesn’t just react to crises; it amplifies them. Its spikes consistently dwarf the global index, reflecting its fraught role at the center of EU fiscal, energy, and security policy. 
          Germany experiences some of the most intense EPU fluctuations:
        </Paragraph>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Mar 2022 (785):</Text> Russia’s invasion of Ukraine triggers Germany’s historic Zeitenwende (“shift in era”), committing to a massive defense build-up and energy diversification.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Dec 2022 (964):</Text> Heated debates over energy subsidies, nuclear phase-outs, and the green transition fuel sustained uncertainty. Germany formally approved a major defense budget 
            expansion and accelerated energy diversification, raising uncertainty around future taxation and debt sustainability.
          </li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Sep 2023 (737):</Text> The ECB raised rates to a record 4.0%. The move triggered concerns over stagflation, weakening exports, and rising financing costs — all against the backdrop 
            of political tension around green subsidies and industrial competitiveness.
          </li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Nov 2024 (~1096):</Text> A constitutional court ruling voids €60 billion in climate funding, exploding the national budget and triggering coalition chaos.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Apr 2025 (1502):</Text> Federal elections, disputes over EU fiscal rules, and Ukraine war spillovers cement a permanent state of high anxiety.</li>
        </ul> 
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Germany’s spikes consistently outpace the Global index. Germany’s volatility is a barometer for core European instability.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>Poland: Anchored in Domestic Narratives</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          While Germany convulses, Poland’s EPU remains curiously subdued. The highest uncertainty periods for Poland were primarily driven by the compound shocks of the war in Ukraine, the 
          ensuing energy crisis, rampant inflation, and fraught relations with the EU, often amplified by the domestic political cycle:
        </Paragraph>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Sep 2022 (125.5):</Text> Energy security fears and soaring inflation create a perfect storm.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Apr 2023 (130.1):</Text> The rule of law dispute with the EU blocks recovery funds, creating fiscal ambiguity amid the Ukraine war response.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Sep-Nov 2023 (117.6 → 104.9):</Text> A polarized election cycle—with populist pledges and geopolitical shifts—creates the year’s most significant surge.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>2024-2025 (~63.7):</Text> Uncertainty plummets despite global turmoil. The new government unfreezes EU funds but faces “cohabitation” gridlock with the President, 
            replacing existential threats with chronic political stalemate.
          </li>
        </ul>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>The Great Divergence: What the Data Reveals</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          This isn't just resilience; it's decoupling. Two factors explain the chasm:
        </Paragraph>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Domestic drivers matter most:</Text> Poland’s uncertainty is made at home. Political cycles and proximity to Ukraine matter most. Global events (US tariffs, banking stress) barely register unless they have a local angle. </li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Underreporting of global risks:</Text> Poland’s lower integration into core Eurozone financial markets means it is often the last to feel the heat. This can be a blessing, shielding it from immediate volatility, but also a risk, 
          fostering a dangerous complacency about gathering external storms.</li>
        </ul>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>What This Means for Business</Title>
        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>For European Exposure, Watch Germany:</Text> Germany’s EPU is the indispensable leading indicator for continental fiscal, energy, and political risk. Its crises are Europe’s crises.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>For Poland, Listen Locally:</Text> Relying on global benchmarks is a mistake. Poland’s risk is homegrown. Its EPU index is a direct gauge of domestic political friction and policy shifts—the only signal that reliably moves local assets.
          </li>
        </ul>

        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          The lesson is clear: policy risk is not one-size-fits-all. In Europe’s two-tiered crisis, understanding which story you’re in is the first step to navigating it. The EPU index offers an invaluable window into the climate of risk 
          that shapes future economic outcomes.
        </Paragraph>
      </>
    ),
  },
  {
    id: "4",
    title: "The Great Divergence: Poland's Plummeting Policy Uncertainty Amid a Global Crisis",
    slug: "europe-poland-epu",
    author: "Alina Landowska",
    avatar: 'https://ui-avatars.com/api/?name=Alina+Landowska&background=001f3f&color=fff',
    date: "2025-08-31",
    category: "PL EPU Index",
    tags: ["Global EPU", "PL EPU", "Policy Risk"],
    summary:
      "Poland’s Economic Policy Uncertainty (EPU) index has diverged sharply from global trends, falling to record lows in 2024–2025 while major economies like Germany, the US, and China faced unprecedented volatility. This apparent stability is not a sign of resilience but reflects Poland’s structural insulation from global economic shocks. The divergence highlights a perilous disconnect from worldwide risk, suggesting vulnerability rather than competence. Understanding this anomaly is crucial for assessing Poland’s true economic exposure amid global crises.",
    hero: "/blog4.1.png",
    heroSource: "https://www.policyuncertainty.com/",
    readingTime: 10,
    body: (
      <>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          In today's interconnected world, economic shocks are rarely contained by borders. A crisis in one region often sends ripples of uncertainty across the globe, as we've seen with pandemics, supply chain disruptions, and geopolitical conflicts. When analyzing a country's EPU, we therefore expect to see its index move in relative sync 
          with global trends.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          EPU data from the last three years—tracking a global aggregate  <a href="https://fred.stlouisfed.org/series/GEPUCURRENT" target="_blank" rel="noopener noreferrer">GEPU</a>, <a href="https://fred.stlouisfed.org/series/USEPUINDXD" target="_blank" rel="noopener noreferrer">the US</a>, <a href="https://fred.stlouisfed.org/series/CHNMAINLANDEPU" target="_blank" rel="noopener noreferrer">China</a>, <a href="https://fred.stlouisfed.org/series/DEEPUINDXM" target="_blank" rel="noopener noreferrer">Germany</a>, and <a href="https://epu-index.pl/" target="_blank" rel="noopener noreferrer">Poland</a> —reveals 
          a story of two distinct periods. The first, from 2022-2023, was defined by high but 'normal' volatility driven by the Ukraine war, energy crisis, and inflation. The second, from 2024-2025, saw a dramatic, synchronized 
          global surge in uncertainty that far exceeded previous levels, indicating a new phase of geopolitical and economic instability.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          But not in Poland. While analyzing its EPU index within this global context, a startling paradox has emerged: <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>just as the rest of the world plunged into a period of unprecedented economic policy chaos in 2024-2025, Poland's uncertainty didn't just remain stable—it dramatically fell to record lows.</Text>
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>The Global Synchronized Shock</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          The world experienced a massive, unprecedented spike in economic policy uncertainty starting in late 2024, peaking in mid-2025.  The index was volatile but ranged between ~170-320 from 2022 to late 2024. It then skyrocketed, reaching a staggering 628.5 in April 2025. 
          This is more than double its average level in the preceding years. This indicates a global shock that affected almost all major economies simultaneously. This is likely driven by escalating geopolitical conflicts, potential global recessions, or synchronized political 
          instability far more severe than the initial shock of the Ukraine war.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>Domestic Catalyst Fueled a Global Firestorm</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          The US shows a lagged but extreme reaction to the global shock, becoming a primary source of global uncertainty in 2025.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Insulated from the immediate energy shock of the Ukraine war, the US EPU index displayed notable stability from 2022-2024, especially against the backdrop of soaring European uncertainty. This calm shattered dramatically in 2025. The index surged by over 400% from its 2023 lows, 
          peaking at a staggering <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>560.9 in April 2025</Text>. Even after cooling to <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>372.1 by July</Text>, it settled at a level that was still triple its pre-2025 average, signaling a profound and sustained domestic crisis.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          This suggests that the initial global crises (Ukraine, energy) were external shocks that the US economy was somewhat insulated from. The 2025 surge implies a major <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>domestic catalyst</Text>, such as a severe political crisis (e.g., a contested election, debt ceiling brinkmanship), 
          a significant financial event, or a deep involvement in a new global conflict.
        </Paragraph>

        <Divider />
        
        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>The Decoupled Dragon: Caught in the Crossfire of a Global Storm</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          China's uncertainty trends are largely decoupled from the West, reacting to different drivers, but it was still caught in the late-2024/2025 global storm.  China's peaks often don't align with others (e.g., its high value in Nov 2022 amid global easing). However, 
          it still participated in the global surge, reaching <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>524.8 in April 2025</Text>. 
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          China's uncertainty is primarily driven by <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>domestic policy shifts</Text> (e.g., regulatory crackdowns, property market crises) and its specific geopolitical tensions. Its participation in the 2025 surge suggests the event was so large it also severely impacted China's 
          policy environment, perhaps through a major trade war escalation or a crisis in the Asia-Pacific region.
        </Paragraph>

        <Divider />

        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>The European Epicenter: From Energy Crisis to a Crisis of Confidence</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Germany was the epicenter of European economic policy uncertainty from 2022 onwards and saw catastrophic levels by 2025. 
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Germany consistently had the highest absolute EPU values among all listed countries throughout the entire period. It was already extremely high in 2022 (peaking at 785.0 in March 2022) and reached mind-boggling levels in 2025, peaking at 1502.2 in April 2025.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Germany's economy was the most exposed to the initial energy shock from the Ukraine war due to its reliance on Russian gas. The 2025 levels indicate a complete breakdown of confidence, likely due to a combination of deep industrial recession, severe energy shortages, 
          and political paralysis within the EU's largest economy.
        </Paragraph>

        <Divider />
        <Title level={3} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.3 }}>The Polish Paradox of Stability</Title>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Poland’s EPU trajectory presents a dangerous paradox. While the country displayed notable resilience during the initial global crises of 2022-2023, its nosediving uncertainty in 2024-2025—a period of unprecedented global turmoil—suggests something far more concerning 
          than adept management. This divergence may not be a sign of strength, but rather a symptom of economic marginalization and a perilous disconnect from global realities.
        </Paragraph>

        <ul style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Resilience or Insulation (2022-2023)?</Text> While its deeply integrated neighbors like Germany faced seismic volatility (with indices soaring to 400-800), Poland's index remained curiously subdued, never exceeding 130.1. This points not to robust policy, 
          but to structural insulation from the core channels of the global economic shock.</li>
          <li><Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>Divergence or Delusion (2024-2025)?</Text> As the world plunged into a synchronized crisis, with global indices going parabolic, Poland’s uncertainty fell further to a mere 63.7. This is not stability; it is a glaring anomaly that signals a failure to 
            accurately price in the catastrophic risks unfolding beyond its borders.</li>
        </ul>

        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          This apparent calm is likely a mirage born of irrelevance, not competence. Poland's secondary integration into the core Eurozone and global financial system means it is often the last to feel the heat and the first to mistake its shelter for superiority. Its economy 
          operates as a passenger, not a driver, thus avoiding the volatility that comes with true global significance.
        </Paragraph>
        <Paragraph style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>
          Consequently, this data may not capture calm, but a lagging indicator of vulnerability. Poland’s fate remains deeply interlinked with a crumbling German industrial base and an unstable global order. This artificial calm is not sustainable. This persistently low EPU 
          reading may <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, lineHeight: 1.7 }}>point to a decoupling from global risk sentiment rather than inherent economic stability.</Text>
        </Paragraph>
      </>
    ),
  }
];

const CATEGORIES = [
  { key: "PL EPU Index", count: 3 },
  { key: "Event-driven Uncertainty", count: 1 },
];

// --- Utilities ---------------------------------------------------------------
const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function useSearch(posts) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return posts;
    const term = q.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term) ||
        p.tags.join(" ").toLowerCase().includes(term)
    );
  }, [q, posts]);
  return { q, setQ, filtered };
}

// --- Components --------------------------------------------------------------
function SiteHeader({ onSearch, value }) {
  return (
    <Row align="middle" gutter={[16, 16]}>
      <Col xs={24} md={24} lg={24}>
        <div style={{ background: "#f7f8fa", padding: 16, borderRadius: 12, marginBottom: 16 }}>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search posts, tags, topics…"
          />
        </div>
      </Col>
    </Row>
  );
}

function MetaBar({ post }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // below 'md' breakpoint = mobile

  return (
    <Space
      size="middle"
      direction={isMobile ? "vertical" : "horizontal"}
      split={isMobile ? null : <Divider type="vertical" />}
      align="start"
    >
      <Space>
        <CalendarOutlined />
        <Text>{formatDate(post.date)}</Text>
      </Space>
      <Space>
        <UserOutlined />
        <Text>{post.author}</Text>
      </Space>
      <Space>
        <FolderOpenOutlined />
        <Text>{post.category}</Text>
      </Space>
      <Text>{post.readingTime} min read</Text>
    </Space>
  );
}

function PostList({ posts, onOpen, pageSize = 5 }) {
  const [page, setPage] = useState(1);
  const start = (page - 1) * pageSize;
  const pageItems = posts.slice(start, start + pageSize);

  if (!posts.length) {
    return (
      <Empty
        description={
          <span>
            No results. Try another term.
          </span>
        }
      />
    );
  }

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={pageItems}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            style={{
              background: "#fafafa",
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
            actions={[
              <div
                key="actions"
                style={{
                  display: "flex",
                  flexWrap: "wrap",        // allows wrapping
                  gap: 8,                  // spacing
                }}
              >
                <Space key="meta"><CalendarOutlined /> {formatDate(item.date)}</Space>
                <Space key="cat"><FolderOpenOutlined /> {item.category}</Space>
                <Space key="rt">{item.readingTime} min read</Space>
              </div>
            ]}
            extra={
              <div style={{
                width: "100%",          // take available width
                maxWidth: 260,          // cap it for large screens
                aspectRatio: "16 / 9",  // keeps consistent proportion
                overflow: "hidden",
                borderRadius: 8,
              }}>
                <img
                  alt={item.title}
                  src={item.hero}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
              </div>
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <a onClick={() => onOpen(item)} className="post-list-title">{item.title}</a>
              }
              description={
                <Space className="post-meta" size={[8, 8]} wrap>
                  {item.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </Space>
              }
            />
            <Paragraph className="post-summary" ellipsis={{ rows: 3 }}>{item.summary}</Paragraph>
          </List.Item>
        )}
      />

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={posts.length}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

function Sidebar({ onFilterCategory, activeCategory}) {
  return (
    <div style={{ background: "#f7f8fa", padding: 16, borderRadius: 12 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title={<span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>Categories</span>} size="small" className="rounded-2xl">
          <Space size={[8, 8]} wrap>
            {CATEGORIES.map((c) => (
              <Tag
                key={c.key}
                onClick={() => onFilterCategory(c.key === activeCategory ? null : c.key)} // toggle
                color={activeCategory === c.key ? "blue" : undefined} 
                style={{ cursor: "pointer", fontFamily: "'Inter', Arial, sans-serif"}}>
                {c.key} ({c.count})
              </Tag>
            ))}
          </Space>
      </Card>
    </Space>
  </div> 
  );
}

function ShareBar() {
  return (
    <Space>
      <Button icon={<ShareAltOutlined />}>Share</Button>
      <Button icon={<TwitterOutlined />} />
      <Button icon={<LinkedinOutlined />} />
      <Button icon={<LinkOutlined />} />
    </Space>
  );
}

function PostView({ post, onBack, onFilterCategory, onOpen}) {
  return (
    <>
      <Breadcrumb
        items={[
          { title: <a onClick={onBack}>Home</a> },
          {
            title: (
              <a
                onClick={() => {
                  onFilterCategory(post.category);
                  onBack();
                }}
              >
                {post.category}
              </a>
            ),
          },
          { title: post.title },
        ]}
      />

      <Title className="post-title" style={{ marginTop: 8 }}>{post.title}</Title>
      <MetaBar className="post-meta" post={post} />

      <Card
        style={{marginTop: 16}}
        onClick={() => {
          // Example: open the hero image or external source in a new tab
          window.open(post.heroSource || post.hero, "_blank", "noopener,noreferrer");
        }}
        cover={<img alt={post.title} 
                    src={post.hero} 
                    style={{
                      height: "auto",        // fill the card/container height
                      width: "100%",         // keep natural width
                      objectFit: "cover",    // crop if needed
                      objectPosition: "center",
                      margin: "0 auto",      // center horizontally
                      display: "block",      // ensures margin:auto works
                      borderRadius: "8px 8px 0 0"
                    }} />}
        className="rounded-2xl"
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div className="flex items-center gap-3">
            <Avatar size="large" icon={<UserOutlined />} />
            <Space direction="vertical" size={0}>
              <Text strong style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 16, fontWeight: 600 }}>{post.author}</Text>
              <Text type="secondary" style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: 14, lineHeight: 1.5 }}>Updated {formatDate(post.date)}</Text>
            </Space>
          </div>

          <Divider style={{ margin: "12px 0" }} />

          <div className="post-body">
            {post.body}
          </div>

          <Divider />

          <Space size={[8, 8]} wrap>
            {post.tags.map((t) => (
              <Tag key={t} className="post-tag">{t}</Tag>
            ))}
          </Space>

          <ShareBar />
        </Space>
      </Card>

      <Divider />

      <Title level={4}>Related posts</Title>
      <Row gutter={[16, 16]}>
        {POSTS.filter((p) => p.id !== post.id)
          .slice(0, 3)
          .map((p) => (
            <Col xs={24} md={12} lg={8} key={p.id}>
              <Card
                hoverable
                className="rounded-2xl"
                cover={<img alt={p.title} src={p.hero} style={{ height: 140, objectFit: "cover" }} />}
                onClick={() => onOpen(p)}
              >
                <Card.Meta title={p.title} description={`${formatDate(p.date)} · ${p.category}`} />
              </Card>
            </Col>
          ))}
      </Row>

      <div className="mt-6">
        <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
          Back to all posts
        </Button>
      </div>
    </>
  );
}

// --- Main App ---------------------------------------------------------------
export default function BlogApp() {
  const { q, setQ, filtered } = useSearch(POSTS);
  const [active, setActive] = useState(null); // post or null
  const [categoryFilter, setCategoryFilter] = useState(null);

  const visiblePosts = useMemo(() => {
    let base = filtered;
    if (categoryFilter) base = base.filter((p) => p.category === categoryFilter);
    return base.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filtered, categoryFilter]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Content style={{ padding: "32px 16px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        {/* Centered Title Row */}
        {!active && (
          <Row justify="center" style={{ marginBottom: 24 }}>
            <Col>
              <Title
                level={2}
                className="latest-posts-title"
                style={{ textAlign: "center" }}
              >
                Latest Posts
              </Title>
            </Col>
          </Row>
        )}

        {/* Main Content Row */}
        <Row gutter={[24, 24]}>
          {/* Sidebar Column (only when no post is open) */}
          {!active && (
            <Col xs={24} lg={5}>
              <SiteHeader onSearch={setQ} value={q} />
              <Sidebar
                onFilterCategory={(c) => setCategoryFilter(c)}
                activeCategory={categoryFilter}
              />
            </Col>
          )}

          {/* Posts Column */}
          <Col xs={24} lg={active ? 24 : 19}>
            {!active ? (
              <PostList posts={visiblePosts} onOpen={(p) => setActive(p)} />
            ) : (
              <PostView
                post={active}
                onBack={() => setActive(null)}
                onOpen={(p) => setActive(p)}
                onFilterCategory={(c) => setCategoryFilter(c)}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>

  );
}
