/**
 * ✏️ 网站的中文文案都在这个文件里改。
 *
 * 这里只写“文字”。图片、链接、颜色、3D 场景等仍然只在 content.ts 里设置，中英文共用。
 * 规则：
 * - 项目用 slug 对应（和 content.ts 里的 slug 一致）。
 * - flows / details 按顺序对应 content.ts 里的同一项：第 1 条对第 1 条。
 * - 某一项不写，就显示英文原文。
 *
 * TODO: 这些中文是按英文版和中文简历拟的草稿，请改成你自己的话。
 */
import { about as aboutEn, sections as sectionsEn, site as siteEn } from "./content";
import type { Project, Section } from "./content";

type ProjectText = {
  tag?: string;
  title?: string;
  description?: string;
  meta?: string;
  intro?: string;
  concept?: { quote?: string; source?: string; text?: string };
  detailsTitle?: string;
  flows?: { title?: string; caption?: string }[];
  details?: { heading?: string; text?: string }[];
  /** 大数字下面的说明，按顺序对应 content.ts 的 stats；数字本身两种语言共用 */
  stats?: { label?: string }[];
  /** 外部链接的文字，按顺序对应 content.ts 的 links */
  links?: { label?: string }[];
  /** 手机样机每一页的标题和说明，按顺序对应 content.ts 的 screens */
  screens?: { title?: string; caption?: string }[];
  screensTitle?: string;
  /** 更多组手机演示：小标题和每一页的文字，按顺序对应 content.ts 的 moreShowcases */
  moreShowcases?: { title?: string; screens?: { title?: string; caption?: string }[] }[];
};

/* ------------------------------ 全站通用 ------------------------------ */

const siteText = {
  /** 首屏大字。中文版不显示名字，只放这一句；tagline 留空 = 大字下面不再有小字 */
  heroTitle: "Building cool stuff with AI.",
  tagline: "",
  /** 顺序对应 content.ts 的 nav */
  nav: ["经历", "项目", "关于"],
  mobileNote: "请用电脑浏览完整版",
  footerMessage: "👋 谢谢你来看！欢迎找我聊 AI 产品 :)",
  footerPagesTitle: "页面",
  /** 顺序对应 content.ts 的 footerPages */
  footerPages: ["首页", "经历", "项目", "关于我"],
  footerSocialTitle: "联系我",
  /** 顺序对应 content.ts 的 social */
  social: ["LinkedIn", "GitHub", "邮箱", "英文简历", "中文简历"],
};

/** 首页两个分区的标题，用分区 id 对应 */
const sectionTitles: Record<string, string> = {
  experience: "经历",
  projects: "项目",
};

/* ------------------------------ 项目 ------------------------------ */

const projectText: Record<string, ProjectText> = {
  zhilong: {
    tag: "AI 产品经理实习生",
    title: "智珑科技",
    description: "负责诊后随访 Agent 的架构设计与用户画像体系搭建。",
    meta: "北京 · 2025.05 – 2025.08",
    intro: "清华背景创始团队，已完成 Pre-A 轮融资，专注于多模态医疗 AI 在诊后场景中的应用。我主要负责 Agent 架构设计与用户画像体系搭建。",
    stats: [
      { label: "采集患者数据" },
      { label: "有效随访率，原 47.4%" },
      { label: "问卷完成率，原 24.1%" },
    ],
    flows: [
      {
        title: "诊后随访 Agent",
        caption: "状态机结合 LLM 语义决策，基于患者画像与长期记忆，实现拟人化随访、日常陪伴、用药提醒与问卷推送。",
      },
      {
        title: "多智能体系统",
        caption:
          "基于 Python 和 LangGraph 搭建：对话 Agent 把请求并行分发给医疗、销售、情绪三个专家 Agent，汇总建议后生成回复，再由独立审核 Agent、风险识别与人工接管构建安全护栏。",
      },
    ],
    detailsTitle: "其他工作",
    details: [
      {
        heading: "专家队列跟踪",
        text: "为东直门医院中医专家设计低摩擦数据采集流程，成功交付并采集 **200+** 患者数据。",
      },
      {
        heading: "漏斗迭代",
        text: "分析从触达到问卷完成的随访漏斗，按 Bad Case 优化随访与兜底逻辑，有效随访率从 **47.4%** 升至 **63.3%**，问卷完成率从 **24.1%** 升至 **75.1%**。",
      },
      {
        heading: "用户画像与分型",
        text: "基于原始数据建立画像字段，用 LLM 按大五人格打标，为多智能体系统中的销售 Agent 定制话术。",
      },
    ],
  },

  machinepulse: {
    tag: "AI 产品经理实习生",
    description: "负责海外增长 Agent 活动的设计与落地，并参与 AI 搜索的全球内容数据基建。",
    meta: "上海 · 2025.02 – 2025.05",
    intro: "创始团队来自字节跳动核心业务，获高瓴等机构投资，面向北美市场开发主动式 AI Agent 产品。我主要负责海外增长 Agent 活动的设计与落地，并参与 AI 搜索的全球内容数据基建。",
    stats: [
      { label: "线上活动触达用户" },
      { label: "进入深度对话" },
      { label: "新加坡活动注册转化率" },
    ],
    details: [
      {
        heading: "线下 Agent 活动",
        text: "联名茉莉奶白设计新加坡 NFC 寻宝活动并统筹校园落地，把用户引入 iMessage 与 Agent 对话，触达 **1 万+** 用户，注册转化率 **56%**。",
      },
      {
        heading: "线上 Agent 活动",
        text: "设计 Pay My Bill 的游戏规则，并通过 Prompt 与 Tool Calling 让 Agent 执行，触达 **2 万+** 用户，约 **30%** 进入多轮深度对话。",
      },
      {
        heading: "自动评测",
        text: "基于历史用户数据，在沙盒中模拟用户与 Agent 的连续对话，按失败归因调优 Prompt，修复 Agent 记不住对话轮数的问题。",
      },
      {
        heading: "全球内容数据基建",
        text: "基于第三方 API 交付 **30** 个 Skills，自动导入多类内容，一周覆盖纽约、洛杉矶 **200+** 活动。",
      },
    ],
  },

  toneo: {
    tag: "产品、AI 与后端",
    description: "AI 键盘，缩短你与第二语言表达之间的距离，让对方通过你的英文感受到你的意图。",
    concept: {
      quote: "“我的语言的界限，意味着我的世界的界限。”",
      source: "维特根斯坦",
      text: "Toneo 是一款 AI 键盘，致力于缩短用户的自我与第二语言表达之间的距离。我们相信，人与人之间的理解，不应以语言的流利程度或表达方式的趋同为前提。Toneo 更关注的是，用户能否通过语言让对方真正感受到自己的意图、情绪和性格，让连接自然发生。",
    },
    meta: "美国洛杉矶 · 2026.11 – 至今",
    intro: "团队项目，一款帮用户用英文回复消息的 iOS AI 键盘。担任项目负责人，负责产品、全部 AI 能力和后端。预计 12 月上架 App Store，并完成第一批小范围用户测试。",
    screens: [
      { title: "认识 Toneo", caption: "Toneo 是一款 AI 键盘：帮你读懂英文聊天，你用中文说想怎么回，它替你写成符合你语气的地道英文。" },
      { title: "设置键盘", caption: "一页完成键盘和快捷指令的设置，完成的步骤会自动打勾。" },
      { title: "轻点背面", caption: "聊天时轻点手机背面两下，Toneo 就会读取对话，不用切出 App。" },
      { title: "用真实对话试一次", caption: "拿一段约饭的英文消息试试：先总结对话，再输入你想怎么回。" },
      { title: "设置完成", caption: "之后导入微信聊天截图，让写出来的回复更像你。" },
      { title: "学习你的语气", caption: "上传聊天截图并选择和对方熟不熟。只保存提取出的常用语和它出自的那一句，不保存截图。" },
      { title: "AI 记忆", caption: "个人信息和从聊天里学到的常用语，都在这里查看。" },
    ],
    screensTitle: "上手引导",
    moreShowcases: [
      {
        title: "键盘功能",
        screens: [
          {
            title: "读取并总结",
            caption: "轻点手机背面两下，Toneo 会在屏幕顶部用中文总结这段聊天，并拆成几个要点。",
          },
          {
            title: "用指令回复",
            caption: "在指令框里用中文说想怎么回，或者直接点「答应，很期待」「委婉拒绝」「说我会晚到」这类快捷回复，Toneo 写成地道的英文。",
          },
        ],
      },
    ],
    details: [
      {
        heading: "语气个性化 Agent",
        text: "按日常、专业、闲聊、小组合作等场景，用 LLM 生成示例回复再人工标注修改，建成检索库；再从微信截图里提取用户自己的常用语，做 few-shot 检索增强，让英文回复保留用户本来的语气。团队内测中，90% 的对比选择了 few-shot 版本。",
      },
      {
        heading: "AI 记忆",
        text: "从用户的聊天截图中提取高频口头禅和用户信息，每条信息须附原话证据并经代码回查，防止模型编造；原始聊天只存在手机本地。",
      },
      {
        heading: "模型选型",
        text: "对不同模型分直接生成、已知对象与渠道、带语气画像三种条件组织用户盲评，最终选用 Gemini Flash-Lite 作为默认模型。",
      },
      {
        heading: "后端服务",
        text: "基于 Python FastAPI 搭建后端并部署于 Vercel，提供流式回复生成、聊天截图总结、用户记忆分析三个核心接口。生成链路包括场景与语气档判定、样例向量检索（Gemini Embedding 语义排序、MMR 去重、相似度门槛）、多轮修改和输出校验。相似度门槛经人工打分校准，不相关样例占比从 41% 降至 25%。",
      },
    ],
  },

  "pt-drone": {
    tag: "联合创始人",
    description: "为航空航天初创企业提供 AI 驱动的集装箱式微型工厂，USC 在孵。",
    meta: "美国洛杉矶 · 2026.08 – 至今",
    intro: "USC 在孵项目，与黄强教授团队合作，为航空航天初创企业提供 AI 驱动的集装箱式微型工厂。获 USC Viterbi 5 万美元资助，并获 Techstars、YC 等多家投资机构关注。",
    details: [
      { heading: "客户探索", text: "基于团队 100+ 次访谈，锁定 El Segundo 高频原型需求企业。" },
      { heading: "商业模式", text: "从本地制造到产能预订，再到专属微工厂的递进模式。" },
      { heading: "融资叙事", text: "撰写种子轮前融资材料。" },
      { heading: "AI 检索增强", text: "知识图谱结合 GraphRAG。" },
    ],
  },

  "llm-routing": {
    tag: "机器学习",
    title: "大语言模型动态路由",
    description: "在保证用户满意度的前提下，把请求动态路由到低成本模型，每千次请求成本降低 55%。",
    meta: "美国洛杉矶 · 2026.10 – 2026.11",
    intro: "USC 机器学习课程项目，研究兼顾成本与用户偏好的模型选择。",
    details: [
      {
        heading: "问题定义",
        text: "强模型单次成本约为弱模型的 6.1 倍，但用户仅在 62% 的对比中更偏好它。目标是在保证用户满意度的前提下，把请求路由到低成本模型。",
      },
      {
        heading: "评估框架",
        text: "基于 10.1 万条 LMArena 用户偏好投票，用 Bradley-Terry 划分强弱两档；按 prompt 分组切分数据，预先登记成功标准，并用 APGR 衡量路由效果。",
      },
      {
        heading: "路由器建模",
        text: "基于 embedding 的路由器将测试集 APGR 从 0.529 提升至 0.612；7 个由大模型生成的语义标签只用约 6,700 条投票就接近这一结果。",
      },
      {
        heading: "成本效益",
        text: "价格规则加 embedding 路由器的两层策略，保留强模型一半的质量增益，每千次请求成本降低 **55%**（18.89 美元降至 8.46 美元）。",
      },
    ],
  },

  somatia: {
    tag: "达索系统 × USC",
    description: "面向假肢适配的医疗智能体与数字孪生方案。",
    meta: "美国洛杉矶 · 2026.10",
    intro: "医疗智能体与数字孪生解决方案，达索系统与 USC 的校企合作项目。",
    details: [
      {
        heading: "流程与需求分析",
        text: "梳理假肢适配流程，发现患者需求与临床经验在设计环节传递不足，并明确智能化协作的使用场景。",
      },
      {
        heading: "智能体方案设计",
        text: "参与设计整合患者与专家信息、识别设计与仿真所需信息缺口的医疗智能体，支持跨角色协作与设计决策。",
      },
      {
        heading: "验证与汇报",
        text: "参与制作概念原型，并直接向达索系统全球增长策略负责团队汇报方案，说明智能体如何与达索的设计、仿真和虚拟孪生工具配合。",
      },
    ],
  },
};

/* ------------------------------ About 页 ------------------------------ */

const aboutText = {
  /** 顺序对应 content.ts 的 about.bio */
  bio: [
    {
      heading: "现在",
      text: "现居洛杉矶，就读于南加州大学，专注于设计、商业与技术的跨学科融合。在这里逐步建立了对数据的敏锐洞察与分析直觉，也培养了对机器学习的浓厚兴趣。同时，与合伙人共同推进 PT Drone 项目，目前正处于 USC 孵化阶段。",
    },
    {
      heading: "背景",
      text: "本科就读于伦敦时装学院珠宝设计专业，本科三年的系统课程塑造了审美直觉和个人审美体系。",
    },
    {
      heading: "成长",
      text: "本科阶段的学习培养了我的审美直觉，而 AI 则带来了另一种令人兴奋的思考方式。机器学习与数据推动我的思考从直觉走向分析，用实验来验证想法和理解规律。而进入 AI 行业，就像打开斯金纳的箱子，踏入以数学与逻辑为根基的计算世界。这里新的认知不断被建立和推翻，我享受这种持续学习、不断拓展认知边界的过程。",
    },
  ],
  /** 顺序对应 content.ts 的 about.lists；items 也按顺序对应 */
  lists: [
    {
      title: "近期经历",
      action: "查看全部",
      items: [
        { label: "PT Drone · 联合创始人", value: "至今" },
        { label: "智珑科技 · AI 产品经理实习生", value: "2025" },
        { label: "MachinePulse · AI 产品经理实习生", value: "2025" },
      ],
    },
    {
      title: "教育背景",
      items: [
        { label: "USC · 整合设计、商业与技术硕士", value: "2026 – 28" },
        { label: "UAL · 珠宝设计学士", value: "2021 – 24" },
      ],
    },
  ] as { title: string; action?: string; items: { label: string; value: string }[] }[],
  /** 技能卡片；顺序对应 content.ts 的 about.skills.items */
  skills: {
    title: "技能",
    items: [
      "人工智能 (AI)",
      "机器学习",
      "LangGraph",
      "LangChain",
      "上下文工程",
      "Agent CLI",
      "提示词写作",
      "Vibe Coding",
      "AI Agent 基础",
      "Python",
      "Python 数据结构",
      "SQL",
      "LaTeX",
      "数据分析",
      "分析能力",
      "产品管理",
      "产品运营",
      "利益相关方管理",
      "营销活动",
      "故事提案",
      "Figma",
      "时尚",
      "设计思维",
      "品牌",
      "数字化制造",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* 下面是把中文套到英文结构上的代码，一般不用改。                        */
/* ------------------------------------------------------------------ */

function localizeProject(project: Project): Project {
  const text = projectText[project.slug];
  if (!text) return project;
  return {
    ...project,
    tag: text.tag ?? project.tag,
    title: text.title ?? project.title,
    description: text.description ?? project.description,
    meta: text.meta ?? project.meta,
    intro: text.intro ?? project.intro,
    concept: project.concept
      ? {
          quote: text.concept?.quote ?? project.concept.quote,
          source: text.concept?.source ?? project.concept.source,
          text: text.concept?.text ?? project.concept.text,
        }
      : undefined,
    detailsTitle: text.detailsTitle ?? project.detailsTitle,
    flows: project.flows?.map((flow, index) => ({
      ...flow,
      title: text.flows?.[index]?.title ?? flow.title,
      caption: text.flows?.[index]?.caption ?? flow.caption,
    })),
    details: project.details.map((detail, index) => ({
      ...detail,
      heading: text.details?.[index]?.heading ?? detail.heading,
      text: text.details?.[index]?.text ?? detail.text,
    })),
    stats: project.stats?.map((stat, index) => ({
      ...stat,
      label: text.stats?.[index]?.label ?? stat.label,
    })),
    links: project.links?.map((link, index) => ({
      ...link,
      label: text.links?.[index]?.label ?? link.label,
    })),
    screens: project.screens?.map((screen, index) => ({
      ...screen,
      title: text.screens?.[index]?.title ?? screen.title,
      caption: text.screens?.[index]?.caption ?? screen.caption,
    })),
    screensTitle: text.screensTitle ?? project.screensTitle,
    moreShowcases: project.moreShowcases?.map((group, groupIndex) => {
      const groupText = text.moreShowcases?.[groupIndex];
      return {
        title: groupText?.title ?? group.title,
        screens: group.screens.map((screen, index) => ({
          ...screen,
          title: groupText?.screens?.[index]?.title ?? screen.title,
          caption: groupText?.screens?.[index]?.caption ?? screen.caption,
        })),
      };
    }),
  };
}

export const site: typeof siteEn = {
  ...siteEn,
  heroTitle: siteText.heroTitle,
  tagline: siteText.tagline,
  nav: siteEn.nav.map((link, index) => ({ ...link, label: siteText.nav[index] ?? link.label })),
  mobileNote: siteText.mobileNote,
  footerMessage: siteText.footerMessage,
  footerPagesTitle: siteText.footerPagesTitle,
  footerPages: siteEn.footerPages.map((link, index) => ({ ...link, label: siteText.footerPages[index] ?? link.label })),
  footerSocialTitle: siteText.footerSocialTitle,
  social: siteEn.social.map((link, index) => ({ ...link, label: siteText.social[index] ?? link.label })),
};

export const sections: Section[] = sectionsEn.map((section) => ({
  ...section,
  title: sectionTitles[section.id] ?? section.title,
  projects: section.projects.map(localizeProject),
}));

export const allProjects: Project[] = sections.flatMap((section) => section.projects);

export const about: typeof aboutEn = {
  ...aboutEn,
  bio: aboutEn.bio.map((block, index) => ({ ...block, ...aboutText.bio[index] })),
  lists: aboutEn.lists.map((list, index) => {
    const text = aboutText.lists[index];
    if (!text) return list;
    return {
      ...list,
      title: text.title,
      action: list.action ? { ...list.action, label: text.action ?? list.action.label } : undefined,
      items: list.items.map((item, itemIndex) => ({ ...item, ...text.items[itemIndex] })),
    };
  }),
  skills: {
    title: aboutText.skills.title,
    items: aboutEn.skills.items.map((item, index) => ({ ...item, label: aboutText.skills.items[index] ?? item.label })),
  },
};
