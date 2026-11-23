/**
 * ✏️ 你的网站内容都在这个文件里改。
 *
 * - 这里是英文版。中文版的文字在 content.zh.ts 里改（图片、链接等两个语言共用这里的）。
 * - 图片 / 视频放到 public/portfolio/images 或 public/portfolio/videos，
 *   然后在这里写路径，例如 "/portfolio/images/my-project.png"。
 * - 不填的图片位置会显示占位，方便你先看布局。
 */

export type WorkFlow = {
  title: string;
  caption?: string;
  /** 用一张现成的图（可选）。填了就显示图，不再画 stages */
  image?: { src: string; alt: string };
  stages?: { title: string; items: string[]; highlight?: boolean }[];
  footnote?: string;
};

/** 手机样机里的一页：截图 + 右侧步骤列表的标题和说明 */
export type PhoneScreen = {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  /** 在截图上叠一个会动的 Toneo：中心位置（占截图宽 / 高的百分比）和大小（占截图宽的百分比） */
  mascot?: { x: number; y: number; size: number };
};

export type Project = {
  /** 详情页地址的最后一段：/work/<slug>，只用小写字母、数字和连字符 */
  slug: string;
  /** 填了的话，点击文件夹直接在新标签页打开这个地址，不进详情页 */
  externalHref?: string;
  /** 文件夹正面的小标签，例如你的职位 */
  tag: string;
  title: string;
  /** 文件夹下面的一句话介绍（最多显示两行） */
  description: string;
  /** 从文件夹里探出来的 logo（可选，不填显示标题文字） */
  logo?: string;
  /** logo 的主色。文件夹的磨砂面和投影会带一点这个颜色的反光（可选） */
  accent?: string;
  /** 折在首页文件夹里的小图（最多两张，海报、截图等） */
  extras?: { src: string; alt: string }[];
  /** 详情页：用会动的吉祥物代替顶部 logo 图（目前只有 "toneo"） */
  mascot?: "toneo";
  /** 详情页：不显示大标题（logo 里已经有名字时用） */
  hideTitle?: boolean;
  /** 详情页：logo 水平挪动多少像素，负数往左（用来抵消图片自带的留白） */
  logoShift?: number;
  /** 详情页：地点和时间 */
  meta?: string;
  /** 详情页：开头的一段介绍 */
  intro?: string;
  concept?: { quote: string; source: string; text: string };
  /** 详情页：介绍下面的一张可点击大图卡片，点击打开 href（可选） */
  feature?: { src: string; alt: string; href: string };
  /** 详情页：一排大数字（可选）。只写简历里有依据的数字 */
  stats?: { value: string; label: string }[];
  /** 详情页：手机样机演示（可选）。截图按顺序上下渐隐切换，右边列出每一页的标题和说明 */
  screens?: PhoneScreen[];
  /** 上面这组手机演示的小标题（可选） */
  screensTitle?: string;
  /** 更多组手机演示，每组单独一个样机和小标题，排在 screens 下面 */
  moreShowcases?: { title: string; screens: PhoneScreen[] }[];
  /** 详情页：流程图（可选）。每个阶段一列，从左到右用箭头连起来 */
  flows?: WorkFlow[];
  /** 详情页：文字条目排成一排小卡片（适合每条只有一句话的情况） */
  detailsInRow?: boolean;
  /** 详情页：文字条目的小标题（可选），例如 "ALSO" */
  detailsTitle?: string;
  /** 详情页：每一条做了什么。text 里用 **两个星号** 包住的字会显示成蓝色 */
  details: { heading: string; text: string; /** 图片；填了 href 的图片点击会在新标签页打开那个地址 */ images?: { src: string; alt: string; href?: string }[]; /** true = 不要卡片底，直接放在页面上 */ plain?: boolean }[];
  /** 详情页：外部链接，例如 GitHub、Pitch Deck（可选） */
  links?: { label: string; href: string }[];
};

export type Section = { id: string; title: string; projects: Project[] };

export const site = {
  /** 浏览器标签页标题 */
  title: "Yiqing Xie",
  description: "AI Product Manager",

  /** 首屏 */
  name: "Yiqing Xie",
  /** 首屏大字（一般就是名字）和它下面的一句话；tagline 留空就只显示大字 */
  heroTitle: "Yiqing Xie",
  tagline: "Building AI agent products, from workflow to launch.",

  /**
   * 首屏 3D 场景：在 Spline 里点 Export，把生成的链接贴到 splineUrl。
   * - Code Export → React 给的 https://prod.spline.design/…/scene.splinecode（推荐）
   * - 或 Public URL 给的 https://my.spline.design/… 链接
   * 留空字符串会显示占位文字。
   */
  splineUrl: "https://prod.spline.design/AGGcyzyjuXa-8CxY/scene.splinecode",
  /** 场景加载前显示的静态截图，例如 "/portfolio/images/hero-poster.jpg"（可留空） */
  splinePoster: "",
  /** 首屏底色。场景加载后也会被设成这个颜色（覆盖 Spline 里设的背景色） */
  splineBackground: "#ffffff",
  /** 场景里要隐藏的物体（写 Spline 图层面板里的名字）。只在网站上隐藏，不改 Spline 文件 */
  splineHiddenObjects: [] as string[],

  /** 顶部左侧 logo：写图片路径；留空就显示 logoText */
  logo: "/portfolio/images/logo-crab.png",
  logoText: "YX",

  /** 顶部导航（最多 3 个效果最好） */
  nav: [
    { label: "Work", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/about" },
  ],

  /** 窄屏（手机）上显示的提示 */
  mobileNote: "VIEW DESKTOP MODE FOR FULL VERSION",

  footerMessage: "👋 Thanks for stopping by! Let's talk about AI products :)",
  footerPagesTitle: "PAGES",
  footerPages: [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "About Me", href: "/about" },
  ],
  footerSocialTitle: "LET’S CONNECT",
  /** TODO: 把 "#" 换成你的真实链接 */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yiqing-xie-41718441a/" },
    { label: "GitHub", href: "https://github.com/yiqingxie830-coder" },
    { label: "Email", href: "mailto:xieyiqin@usc.edu" },
    // 简历下载：文件放在 public/portfolio/ 里，换简历时用同名文件覆盖即可。download 是下载下来的文件名
    // 暂时隐藏：现在的简历里有手机号，换成不带手机号的版本后去掉下面两行开头的 // 即可
    // { label: "Resume (EN)", href: "/portfolio/resume-en.pdf", download: "Yiqing-Xie-Resume.pdf" },
    // { label: "Resume (中文)", href: "/portfolio/resume-zh.pdf", download: "谢奕晴-简历.pdf" },
  ],
};

/**
 * 首页的文件夹。每个文件夹点进去是 /work/<slug> 详情页。
 * TODO: 有 GitHub / Project Page / Pitch Deck 链接的话，加到对应项目的 links 里。
 */
export const sections: Section[] = [
  {
    id: "experience",
    title: "EXPERIENCE",
    projects: [
      {
        slug: "zhilong",
        tag: "AI Product Manager Intern",
        title: "Zhilong Technology",
        description: "Owned agent architecture and user profiling for a post-visit medical follow-up agent.",
        logo: "/portfolio/images/evoleap.png",
        accent: "#2f6bff",
        hideTitle: true,
        logoShift: -20,
        meta: "Beijing, China · May 2025 – Aug 2025",
        intro:
          "Pre-A funded startup founded by a Tsinghua-affiliated team, applying multimodal medical AI to post-visit care. I mainly owned agent architecture design and the user profiling system.",
        stats: [
          { value: "200+", label: "Patients’ data collected" },
          { value: "63.3%", label: "Effective follow-up rate, up from 47.4%" },
          { value: "75.1%", label: "Questionnaire completion, up from 24.1%" },
        ],
        flows: [
          {
            title: "Post-visit follow-up agent",
            caption:
              "A state machine combined with LLM semantic decisions. Built on patient profiles and long-term memory, it runs human-like follow-ups, daily companionship, medication reminders and questionnaires.",
            image: {
              src: "/portfolio/images/zhilong-follow-up-agent.png",
              alt: "Post-visit follow-up agent loop: patient profile and long-term memory feed a hybrid core where the LLM understands the reply and the state machine picks the next step; outputs are follow-ups, medication reminders and questionnaires sent to the patient; patient replies go through risk detection, where risk triggers a human handoff and safe replies loop back to the start.",
            },
          },
          {
            title: "Multi-agent orchestration",
            caption:
              "Built in Python and LangGraph. A chat agent fans each request out to medical, sales and emotional experts in parallel, drafts a reply from their advice, and an independent review agent, risk detection and human handoff act as safety guardrails.",
            image: {
              src: "/portfolio/images/zhilong-multi-agent.png",
              alt: "Multi-agent workflow: a request enters the chat agent, which fans out to medical, sales and emotional expert agents in parallel and receives their advice; the draft goes to a review agent, whose verdict either passes the final response or triggers a fallback message as the external response.",
            },
          },
        ],
        detailsTitle: "ALSO",
        details: [
          {
            heading: "Expert cohort tracking",
            text: "Designed a low-friction data collection workflow for a leading TCM expert at Dongzhimen Hospital, delivered it and collected data from **200+** patients.",
          },
          {
            heading: "Funnel iteration",
            text: "Analyzed the follow-up funnel from first reach to questionnaire completion and fixed fallback logic case by case, raising the effective follow-up rate from **47.4%** to **63.3%** and questionnaire completion from **24.1%** to **75.1%**.",
          },
          {
            heading: "User profiling & segmentation",
            text: "Defined profile fields from raw data, labeled users by Big Five traits with an LLM, and tailored messaging for the sales agent in the multi-agent system.",
          },
        ],
        links: [{ label: "GitHub", href: "https://github.com/yiqingxie830-coder/customer-service-agent" }],
      },
      {
        slug: "machinepulse",
        tag: "AI Product Manager Intern",
        title: "MachinePulse",
        description: "Designed and launched overseas-growth agent campaigns, and contributed to global content data for AI search.",
        logo: "/portfolio/images/karpo.png",
        accent: "#9aa3b5",
        hideTitle: true,
        logoShift: -8,
        extras: [
          { src: "/portfolio/images/karpo-app-update.jpg", alt: "Karpo app update poster" },
          { src: "/portfolio/images/karpo-molly-tea.jpg", alt: "Karpo × Molly Tea trivia campaign poster" },
        ],
        meta: "Shanghai, China · Feb 2025 – May 2025",
        intro:
          "Founded by a team from ByteDance’s core businesses and backed by Hillhouse and other investors, building proactive AI agent products for the North American market. I mainly owned the design and launch of overseas-growth agent campaigns, and contributed to global content data for AI search.",
        stats: [
          { value: "20K+", label: "Users reached online" },
          { value: "~30%", label: "Into deep conversations" },
          { value: "56%", label: "Sign-up conversion (Singapore)" },
        ],
        details: [
          {
            heading: "Offline agent campaign",
            text: "Designed an NFC treasure hunt in Singapore co-branded with Molly Tea and ran the campus rollout, reaching **10K+** users with a **56%** sign-up conversion rate.",
            images: [
              { src: "/portfolio/images/karpo-molly-tea.jpg", alt: "Karpo × Molly Tea trivia campaign poster for Singapore" },
              { src: "/portfolio/images/karpo-chat-screens.jpg", alt: "Two iMessage chats with Karpo: the Pay My Bill flow and the Singapore trivia challenge" },
            ],
          },
          {
            heading: "Online agent campaign",
            plain: true,
            text: "Designed the rules of “Pay My Bill” and implemented them through prompts and tool calling, reaching **20K+** users with about **30%** going into deep multi-turn conversations.",
          },
          {
            heading: "Automated evaluation",
            plain: true,
            text: "Simulated continuous user–agent conversations in a sandbox from past user data, traced failures to their causes and tuned the prompt, fixing the agent losing track of turn counts.",
          },
          {
            heading: "Global content data",
            plain: true,
            text: "Delivered **30** skills on third-party APIs to auto-import different kinds of content, covering **200+** events in New York and Los Angeles within one week.",
            images: [
              {
                src: "/portfolio/images/karpo-city-guides.jpg",
                alt: "Karpo City Guides page for New York: a “Karpo Picks / Hot Right Now” feed of city guide articles. Opens app.karpo.ai",
                href: "https://app.karpo.ai/city-guides/nyc",
              },
            ],
          },
        ],
        links: [{ label: "karpo.ai", href: "https://app.karpo.ai/" }],
      },
    ],
  },
  {
    id: "projects",
    title: "PROJECTS",
    projects: [
      {
        slug: "toneo",
        tag: "Product, AI & Backend",
        title: "Toneo",
        description: "An AI keyboard that closes the gap between who you are and how you sound in English, so others feel your intent.",
        concept: {
          quote: "“The limits of my language mean the limits of my world.”",
          source: "Ludwig Wittgenstein",
          text: "Toneo is an AI keyboard that closes the distance between who you are and how you sound in a second language. We believe understanding between people shouldn’t depend on fluency, or on everyone expressing themselves the same way. What matters to us is whether your words let others truly feel your intent, emotions and personality, so that connection happens naturally.",
        },
        logo: "/portfolio/images/toneo-logo.svg",
        mascot: "toneo",
        accent: "#9b8cff",
        hideTitle: true,
        meta: "Los Angeles, CA · Nov 2026 – Present",
        intro: "A team project: an iOS AI keyboard that helps users reply in English. I lead the project and own the product, all of the AI and the backend. We expect to launch on the App Store in December and run a first small-group user test.",
        screens: [
          {
            src: "/portfolio/images/toneo-1-hello-v3.jpg",
            mascot: { x: 21.2, y: 39.3, size: 19.7 },
            alt: "Toneo onboarding: a blurred list of commands (Summarize this chat, Reply in English, Make it shorter, Sound more polite) around a card that says Hi, I'm Toneo.",
            title: "Meet Toneo",
            caption: "Toneo is an AI keyboard. It helps you read English chats, then turns what you want to say in Chinese into natural English in your tone.",
          },
          {
            src: "/portfolio/images/toneo-2-setup-v2.jpg",
            mascot: { x: 16.2, y: 60.7, size: 11.1 },
            alt: "Set up your Keyboard: two checked cards, Add keyboard with the Settings path, and Add to Shortcuts.",
            title: "Set up the keyboard",
            caption: "Add the keyboard and the shortcut on one page. Finished steps check themselves off.",
          },
          {
            src: "/portfolio/images/toneo-3-backtap.jpg",
            alt: "Add Shortcut to Back Tap: Settings path Accessibility, Touch, Back Tap, Double Tap, Toneo, with a phone illustration.",
            title: "Double-tap the back",
            caption: "While chatting, double-tap the back of the phone and Toneo reads the conversation, without leaving the app.",
          },
          {
            src: "/portfolio/images/toneo-4-try.jpg",
            alt: "Try your Toneo Keyboard: a summary bubble of an English invite to ramen on Friday at 7, the original message, and an input field.",
            title: "Try it on a real chat",
            caption: "A sample dinner invite: Toneo sums it up first, then you type how you want to reply.",
          },
          {
            src: "/portfolio/images/toneo-5-ready-v2.jpg",
            mascot: { x: 50, y: 40.5, size: 44.6 },
            alt: "Your Toneo is ready, with the Toneo mascot.",
            title: "Ready to go",
            caption: "Next, import WeChat screenshots so replies sound more like you.",
          },
          {
            src: "/portfolio/images/toneo-6-home-v2.jpg",
            mascot: { x: 10.2, y: 10.6, size: 15.9 },
            alt: "Toneo home: upload message screenshots, choose close or not close, and links to profile memory and privacy.",
            title: "Learn your tone",
            caption: "Upload chat screenshots and pick how close you are. Only the extracted phrases and the sentence they came from are kept, never the screenshots.",
          },
          {
            src: "/portfolio/images/toneo-7-memory.jpg",
            alt: "Profile and memory page: name and school fields, and an empty AI memory section.",
            title: "AI memory",
            caption: "Your profile and the phrases Toneo has learned from your chats, all in one place.",
          },
        ],
        screensTitle: "Onboarding",
        moreShowcases: [
          {
            title: "The keyboard",
            screens: [
              {
                src: "/portfolio/images/toneo-8-summary-glass.jpg",
                alt: "In an iMessage group chat, a frosted-glass Toneo card at the top summarizes the latest messages in Chinese, with three key-point chips below.",
                title: "Read & summarize",
                caption: "Double-tap the back of the phone and Toneo summarizes the chat in Chinese at the top of the screen, split into key points.",
              },
              {
                src: "/portfolio/images/toneo-9-keyboard.jpg",
                alt: "The Toneo keyboard in iMessage: a Read button, an instruction field, and quick replies: accept and look forward to it, politely decline, say I will be late.",
                title: "Reply by instruction",
                caption: "Say how you want to reply in Chinese in the instruction field, or tap a quick reply like “accept”, “politely decline” or “say I’ll be late”. Toneo writes it in natural English.",
              },
            ],
          },
        ],
        details: [
          {
            heading: "Tone-personalization agent",
            text: "Built a scenario example library (daily, professional, casual, group work) from LLM-generated replies that we annotated and edited by hand, then combined it with phrases extracted from the user’s WeChat screenshots for few-shot retrieval, so English replies keep the user’s voice. In internal team testing, the few-shot version was preferred in 90% of comparisons.",
          },
          {
            heading: "AI memory",
            text: "Extracts the user’s most frequent phrases and personal information from their chat screenshots. Every fact must quote the original message and is checked by code, so the model can’t make things up. Raw chats stay on the phone.",
          },
          {
            heading: "Model selection",
            text: "Ran a user blind evaluation of different models under three conditions (direct generation, known recipient and channel, and a tone profile), and chose Gemini Flash-Lite as the default.",
          },
          {
            heading: "Backend service",
            text: "Built the backend in Python FastAPI on Vercel, with three core endpoints: streaming reply generation, chat-screenshot summary and user-memory analysis. The generation pipeline covers scenario and tone-level detection, vector retrieval of examples (Gemini Embedding ranking, MMR de-duplication, a similarity floor), multi-turn edits and output validation. The similarity floor was calibrated by hand scoring, cutting irrelevant examples from 41% to 25%.",
          },
        ],
      },
      {
        slug: "pt-drone",
        tag: "Co-founder",
        title: "PT Drone",
        description: "AI-driven containerized microfactories for aerospace startups, incubated at USC.",
        logo: "/portfolio/images/ptdrone.png",
        accent: "#4a4a4a",
        detailsInRow: true,
        feature: {
          src: "/portfolio/images/ptdrone-microfactory.jpg",
          alt: "PT Drone microfactory: two 20 ft ISO container modules, Mod A print cell (Multi Jet Fusion) and Mod B assembly (sort, assemble, inspect), with automated calibration and test before release. Opens ptdrone.tech",
          href: "https://ptdrone.tech/",
        },
        hideTitle: true,
        logoShift: -20,
        meta: "Los Angeles, CA · Aug 2026 – Present",
        intro:
          "Incubated at USC and partnering with Prof. Qiang Huang’s lab, providing AI-driven containerized microfactories for aerospace startups. Received $50K in funding from USC Viterbi, with interest from Techstars, YC and other investors.",
        details: [
          { heading: "Customer Discovery", text: "Targeted El Segundo teams with frequent prototyping needs, from 100+ team interviews." },
          { heading: "Business Model", text: "From local manufacturing to capacity reservations to dedicated microfactories." },
          { heading: "Fundraising Narrative", text: "Pre-seed pitch materials." },
          { heading: "AI Retrieval", text: "Knowledge graph combined with GraphRAG." },
        ],
      },
      {
        slug: "llm-routing",
        externalHref: "https://yiqingxie830-coder.github.io/llm-router-v2/#en",
        tag: "Machine Learning",
        title: "Dynamic LLM Routing",
        description: "Routing each request by cost and user preference, using 101K LMArena votes.",
        logo: "/portfolio/images/llm-routing.png",
        accent: "#fbbf1d",
        hideTitle: true,
        logoShift: -16,
        meta: "Los Angeles, CA · Oct 2026 – Nov 2026",
        intro: "USC Machine Learning course project on cost- and preference-aware model selection.",
        details: [
          {
            heading: "Problem Definition",
            text: "The strong model costs about 6.1x the cheap model per request, yet users prefer it in only 62% of comparisons. The goal: route requests to the cheaper model while keeping users satisfied.",
          },
          {
            heading: "Evaluation Framework",
            text: "Used 101K LMArena user preference votes and Bradley-Terry ratings to split strong and weak tiers; split data by prompt group, pre-registered success criteria, and measured routing with APGR.",
          },
          {
            heading: "Router Modeling",
            text: "An embedding-based router raised test-set APGR from 0.529 to 0.612; 7 LLM-generated semantic tags came close to that result using only about 6,700 votes.",
          },
          {
            heading: "Cost-Effectiveness",
            text: "Designed a two-layer routing policy combining price rules with an embedding-based router, keeping half of the strong model’s quality gain while cutting cost per 1,000 requests by **55%** ($18.89 to $8.46).",
          },
        ],
      },
      {
        slug: "somatia",
        tag: "Dassault Systèmes × USC",
        title: "SOMATIA",
        description: "A medical agent and digital twin concept for prosthetic fitting.",
        logo: "/portfolio/images/dassault.jpg",
        accent: "#005386",
        hideTitle: true,
        logoShift: -8,
        meta: "Los Angeles, CA · Oct 2026",
        intro: "Medical agent and digital twin solution, an industry–academic collaboration between Dassault Systèmes and USC.",
        details: [
          {
            heading: "Workflow & Needs Analysis",
            text: "Analyzed the prosthetic fitting workflow with the team, identifying that individual patient needs and clinical expertise were poorly carried into the design stage, and defined use cases for intelligent collaboration.",
          },
          {
            heading: "Agent Solution Design",
            text: "Contributed to the SOMATIA concept, exploring how AI agents can combine patient and clinician input, flag information gaps for design and simulation, and support cross-role collaboration and design decisions.",
          },
          {
            heading: "Validation & Presentation",
            text: "Helped build the concept prototype and reported the solution directly to Dassault Systèmes’ global growth strategy team, showing how the agent works with its design, simulation and virtual twin tools.",
          },
        ],
      },
    ],
  },
];

/** 所有项目（详情页用） */
export const allProjects: Project[] = sections.flatMap((section) => section.projects);

/* ------------------------------------------------------------------ */
/* About 页（/about）：左边自我介绍 + 右边 2×2 “歌单”格子 + 下面两张列表卡 */
/* ------------------------------------------------------------------ */

export type MusicTile = {
  /** 左上角的手写体小字。四格连起来可以是一句话 */
  label: string;
  /** 背景照片或视频（可选，不填显示占位框），例如 "/portfolio/images/me-1.jpg" */
  photo?: string;
  video?: string;
  /** true = 照片上盖一层玻璃反光和边缘高光 */
  glass?: boolean;
  /** true = 不显示左上角小字；没填歌曲时也不显示播放条占位 */
  photoOnly?: boolean;
  /** 这一格的颜色；放了照片后照片会盖在颜色上面。不填就是和其他卡片一样的浅灰磨砂 */
  tint?: string;
  /**
   * Spotify 歌曲 ID：在 Spotify 里对歌曲点 分享 → 复制歌曲链接，
   * 链接 open.spotify.com/track/XXXX 里的 XXXX 就是 ID。留空显示占位条。
   */
  spotifyTrackId: string;
};

export type AboutListItem = {
  /** 左侧小图标（可选，不填显示首字母） */
  icon?: string;
  label: string;
  value: string;
  href?: string;
};

export type AboutList = {
  title: string;
  /** 标题右侧的小链接（可选） */
  action?: { label: string; href: string };
  items: AboutListItem[];
};

export const about = {
  /** About 页顶部的 3D 场景（和首页的场景分开设置） */
  scene: {
    url: "https://prod.spline.design/iaknmuGe-SfaDABt/scene.splinecode",
    /** 加载前显示的静态截图，可留空 */
    poster: "",
    background: "#ffffff",
    /** 放大倍数（1 = 原始大小）和往下挪的距离 */
    zoom: 1.08,
    offsetY: "7%",
    /** 场景往右挪多少，负数往左 */
    offsetX: "4%",
  },

  /** TODO: 这几段是按简历拟的草稿，请改成你自己的话 */
  bio: [
    {
      heading: "TODAY",
      text: "I live in Los Angeles these days. I’m doing my master’s at USC’s Iovine and Young Academy, in a program that mixes design, business and technology. It’s also where I got hooked on machine learning. Alongside that I’m co-founding PT Drone, an AI manufacturing startup that grew out of USC.",
    },
    {
      heading: "BACKGROUND",
      text: "I studied Fashion Jewellery Design at London College of Fashion. Three years of studio training shaped my eye, and over time that grew into a visual sense of my own.",
    },
    {
      heading: "GROWTH",
      text: "Design school trained my intuition. AI gave me a second, equally exciting way to think. Machine learning and data pushed me from instinct toward analysis: run the experiment, test the idea, find the pattern. What draws me most is how fast AI is lowering the bar to making things, so ideas that used to stay imagined can now be built, tested and iterated on quickly. Stepping into AI felt like opening a Skinner box and walking into a world built on math and logic. What I know keeps getting built up and torn down here, and that keeps me learning and stretching what I understand.",
    },
  ],

  /** 四格歌单。TODO: 换成你自己的照片、文字和歌曲 */
  music: [
    { label: "music", photo: "/portfolio/images/about-sunset.jpg", glass: true, spotifyTrackId: "3Gh9maavHOFRoRkzVw0a6Q" }, // DPR IAN — Welcome To The Show
    { label: "fuels", photo: "/portfolio/images/about-range.jpg", glass: true, spotifyTrackId: "019yr0vrtpjvd5TFrvqcDC" }, // 方大同 — 小小蟲
    { label: "my", photo: "/portfolio/images/about-denim-jewellery.jpg", photoOnly: true, glass: true, spotifyTrackId: "3K2u8NWB4cxvVNbYqeKN8g" }, // Kenichiro Nishihara — Someone Like You
    { label: "ideas", photo: "/portfolio/images/about-earring.jpg", photoOnly: true, glass: true, spotifyTrackId: "7Fb8bY5hc5d3CcHLzmwbCk" }, // JOYCE 就以斯 — 只要你開心
  ] satisfies MusicTile[],

  lists: [
    {
      title: "RECENT EXPERIENCES",
      action: { label: "VIEW ALL", href: "/#experience" },
      items: [
        { icon: "/portfolio/images/icon-ptdrone.png", label: "PT Drone · Co-founder", value: "Present" },
        { icon: "/portfolio/images/icon-evoleap.png", label: "Zhilong · AI Product Manager Intern", value: "2025" },
        { icon: "/portfolio/images/icon-karpo.png", label: "MachinePulse · AI Product Manager Intern", value: "2025" },
      ],
    },
    {
      title: "EDUCATION",
      items: [
        { icon: "/portfolio/images/icon-usc.png", label: "USC · M.S. IDBT", value: "2026 – 28" },
        { icon: "/portfolio/images/icon-ual.png", label: "UAL · BA Fashion Jewellery", value: "2021 – 24" },
      ],
    },
  ] satisfies AboutList[],

  /** About 页最下面的技能卡片。图标在 public/portfolio/images/skill-*.png */
  skills: {
    title: "SKILL SET",
    items: [
      { icon: "/portfolio/images/skill-ai.png", label: "Artificial Intelligence (AI)" },
      { icon: "/portfolio/images/skill-machine-learning.png", label: "Machine Learning" },
      { icon: "/portfolio/images/skill-langgraph.png", label: "LangGraph" },
      { icon: "/portfolio/images/skill-langchain.png", label: "LangChain" },
      { icon: "/portfolio/images/skill-context-engineering.png", label: "Context Engineering" },
      { icon: "/portfolio/images/skill-agent-cli.png", label: "Agent CLI" },
      { icon: "/portfolio/images/skill-prompt-writing.png", label: "Prompt Writing" },
      { icon: "/portfolio/images/skill-vibe-coding.png", label: "Vibe Coding" },
      { icon: "/portfolio/images/skill-ai-agents.png", label: "AI Agents Fundamentals" },
      { icon: "/portfolio/images/skill-python.png", label: "Python" },
      { icon: "/portfolio/images/skill-data-structures.png", label: "Python Data Structures" },
      { icon: "/portfolio/images/skill-sql.png", label: "SQL" },
      { icon: "/portfolio/images/skill-latex.png", label: "LaTeX" },
      { icon: "/portfolio/images/skill-data-analysis.png", label: "Data Analysis" },
      { icon: "/portfolio/images/skill-analytical-skills.png", label: "Analytical Skills" },
      { icon: "/portfolio/images/skill-product-management.png", label: "Product Management" },
      { icon: "/portfolio/images/skill-product-operations.png", label: "Product Operations" },
      { icon: "/portfolio/images/skill-stakeholder-management.png", label: "Stakeholder Management" },
      { icon: "/portfolio/images/skill-marketing-campaigns.png", label: "Marketing Campaigns" },
      { icon: "/portfolio/images/skill-story-pitching.png", label: "Story Pitching" },
      { icon: "/portfolio/images/skill-figma.png", label: "Figma" },
      { icon: "/portfolio/images/skill-fashion.png", label: "Fashion" },
      { icon: "/portfolio/images/skill-design-thinking.png", label: "Design Thinking" },
      { icon: "/portfolio/images/skill-branding.png", label: "Branding" },
      { icon: "/portfolio/images/skill-digital-fabrication.png", label: "Digital Fabrication" },
    ],
  },
};
