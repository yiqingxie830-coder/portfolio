/**
 * ✏️ 你的网站内容都在这个文件里改。
 *
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
  /** 详情页：不显示大标题（logo 里已经有名字时用） */
  hideTitle?: boolean;
  /** 详情页：logo 水平挪动多少像素，负数往左（用来抵消图片自带的留白） */
  logoShift?: number;
  /** 详情页：地点和时间 */
  meta?: string;
  /** 详情页：开头的一段介绍 */
  intro?: string;
  /** 详情页：介绍下面的一张可点击大图卡片，点击打开 href（可选） */
  feature?: { src: string; alt: string; href: string };
  /** 详情页：一排大数字（可选）。只写简历里有依据的数字 */
  stats?: { value: string; label: string }[];
  /** 详情页：流程图（可选）。每个阶段一列，从左到右用箭头连起来 */
  flows?: WorkFlow[];
  /** 详情页：文字条目排成一排小卡片（适合每条只有一句话的情况） */
  detailsInRow?: boolean;
  /** 详情页：文字条目的小标题（可选），例如 "ALSO" */
  detailsTitle?: string;
  /** 详情页：每一条做了什么。text 里用 **两个星号** 包住的字会显示成蓝色 */
  details: { heading: string; text: string; images?: { src: string; alt: string }[]; /** true = 不要卡片底，直接放在页面上 */ plain?: boolean }[];
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
  footerPages: [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "About Me", href: "/about" },
  ],
  /** TODO: 把 "#" 换成你的真实链接 */
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "https://github.com/yiqingxie830-coder" },
    { label: "Email", href: "mailto:xieyiqin@usc.edu" },
    { label: "Resume", href: "#" },
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
        description: "Led a post-visit follow-up agent for medical care, from requirements to launch.",
        logo: "/portfolio/images/evoleap.png",
        accent: "#2f6bff",
        hideTitle: true,
        logoShift: -20,
        meta: "Beijing, China · May 2025 – Aug 2025",
        intro:
          "Pre-A funded startup founded by a Tsinghua-affiliated team, applying multimodal medical AI to post-visit care, spanning hospital research partnerships and digitization of care workflows.",
        flows: [
          {
            title: "Post-visit follow-up agent",
            caption:
              "The main thing I led. A hybrid design: a deterministic state machine keeps the care flow predictable, and the LLM handles the semantic decisions inside it.",
            image: {
              src: "/portfolio/images/zhilong-follow-up-agent.png",
              alt: "Post-visit follow-up agent loop: patient profile and long-term memory feed a hybrid core where the LLM understands the reply and the state machine picks the next step; outputs are follow-ups, medication reminders and questionnaires sent to the patient; patient replies go through risk detection, where risk triggers a human handoff and safe replies loop back to the start.",
            },
          },
          {
            title: "Multi-agent orchestration",
            caption:
              "Built in Python and LangGraph. A chat agent fans each request out to medical, sales and emotional experts in parallel, drafts a reply from their advice, and an independent review agent decides whether it goes out.",
            image: {
              src: "/portfolio/images/zhilong-multi-agent.png",
              alt: "Multi-agent workflow: a request enters the chat agent, which fans out to medical, sales and emotional expert agents in parallel and receives their advice; the draft goes to a review agent, whose verdict either passes the final response or triggers a fallback message as the external response.",
            },
          },
        ],
        detailsTitle: "ALSO",
        details: [
          {
            heading: "Patient cohort tracking",
            text: "Worked on-site at Dongzhimen Hospital to build a cohort tracking workflow for a leading TCM expert, redesigning data recording to fit a heavy clinical workload.",
          },
          {
            heading: "User segmentation",
            text: "Built a Big Five–based user typology, labeled traits with the Qwen LLM, and designed communication strategies for a sales agent by user type.",
          },
        ],
      },
      {
        slug: "machinepulse",
        tag: "AI Product Operations Intern",
        title: "MachinePulse",
        description: "Owned Karpo’s “Pay My Bill” agent feature and ran growth in Singapore.",
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
          "Founded by a team from ByteDance’s core businesses and backed by Hillhouse and other investors, building proactive AI agent products for the North American market.",
        details: [
          {
            heading: "Overseas Market Expansion & Growth",
            text: "Ran a Karpo × Molly Tea campaign in Singapore with a **56%** sign-up conversion rate.",
            images: [
              { src: "/portfolio/images/karpo-molly-tea.jpg", alt: "Karpo × Molly Tea trivia campaign poster for Singapore" },
              { src: "/portfolio/images/karpo-chat-screens.jpg", alt: "Two iMessage chats with Karpo: the Pay My Bill flow and the Singapore trivia challenge" },
            ],
          },
          {
            heading: "Conversational Feature Ownership",
            plain: true,
            text: "Owned Karpo’s “Pay My Bill” agent feature from concept to launch.",
          },
          {
            heading: "Content Operations Automation",
            plain: true,
            text: "Integrated third-party APIs to build a batch content generation and auto-entry pipeline supporting content operations across multiple overseas cities, raising content production efficiency about 10x.",
          },
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "PROJECTS",
    projects: [
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
          "Early-stage startup incubated at USC, partnering with Prof. Qiang Huang’s lab to provide AI-driven containerized microfactories for aerospace startups.",
        details: [
          { heading: "Customer Discovery", text: "Customer interviews and target segment." },
          { heading: "Business Model", text: "Staged revenue model design." },
          { heading: "Go-to-Market", text: "Beachhead market and launch plan." },
          { heading: "Fundraising Narrative", text: "Pre-seed pitch materials." },
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
            text: "The strong model costs about 6.1x the cheap model per request but wins only 62% of user preference votes; studied routing each request by its content to balance inference cost against user preference.",
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
            text: "Designed a two-layer routing policy combining price rules with an embedding-based router, capturing half of the strong model’s quality gain while cutting cost per 1,000 requests.",
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
            text: "Helped build the concept prototype and presentation materials, and presented the solution, showing how the agent works with Dassault Systèmes design, simulation and virtual twin tools.",
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
  /** TODO: 这几段是按简历拟的草稿，请改成你自己的话 */
  bio: [
    {
      heading: "TODAY",
      text: "I live in Los Angeles these days. I’m doing my master’s at USC’s Iovine and Young Academy, in a program that mixes design, business and technology. It’s also where I got hooked on machine learning. Alongside that I’m co-founding PT Drone, an AI manufacturing startup that grew out of USC.",
    },
    {
      heading: "BACKGROUND",
      text: "Before any of this I made jewellery. I studied Fashion Jewellery Design at London College of Fashion, and those three years gave me something I still lean on, a feel for when a thing looks right before I can say why.",
    },
    {
      heading: "GROWTH",
      text: "Then I got curious about data, which works the opposite way. It asks you to check the thing you were so sure about. I ended up in AI because it needs both, and because right now it’s where almost any idea can be built and tried.",
    },
  ],

  /** 四格歌单。TODO: 换成你自己的照片、文字和歌曲 */
  music: [
    { label: "music", photo: "/portfolio/images/about-sunset.jpg", spotifyTrackId: "3Gh9maavHOFRoRkzVw0a6Q" }, // DPR IAN — Welcome To The Show
    { label: "fuels", photo: "/portfolio/images/about-range.jpg", spotifyTrackId: "019yr0vrtpjvd5TFrvqcDC" }, // 方大同 — 小小蟲
    { label: "my", photo: "/portfolio/images/about-denim-jewellery.jpg", photoOnly: true, spotifyTrackId: "3K2u8NWB4cxvVNbYqeKN8g" }, // Kenichiro Nishihara — Someone Like You
    { label: "ideas", photo: "/portfolio/images/about-earring.jpg", photoOnly: true, glass: true, spotifyTrackId: "7Fb8bY5hc5d3CcHLzmwbCk" }, // JOYCE 就以斯 — 只要你開心
  ] satisfies MusicTile[],

  lists: [
    {
      title: "RECENT EXPERIENCES",
      action: { label: "VIEW ALL", href: "/#experience" },
      items: [
        { icon: "/portfolio/images/icon-ptdrone.png", label: "PT Drone · Co-founder", value: "Present" },
        { icon: "/portfolio/images/icon-evoleap.png", label: "Zhilong · AI Product Manager Intern", value: "2025" },
        { icon: "/portfolio/images/icon-karpo.png", label: "MachinePulse · AI Product Ops Intern", value: "2025" },
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
};
