import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Car,
  Coffee,
  CookingPot,
  Drama,
  Film,
  Footprints,
  Gem,
  GraduationCap,
  Heart,
  MapPin,
  Mountain,
  Music,
  Plane,
  Ruler,
  Utensils,
  Wine,
  Wine as WineIcon,
} from "lucide-react";

export type Message =
  | {
      id: string;
      kind: "text";
      from: "me" | "them";
      text: string;
      time: string;
      status?: "sent" | "delivered" | "read";
    }
  | {
      id: string;
      kind: "image";
      from: "me" | "them";
      src: string;
      caption?: string;
      time: string;
      status?: "sent" | "delivered" | "read";
    }
  | {
      id: string;
      kind: "system";
      text: string;
    };

/** One strictly ordered step of a scripted conversation. */
export type ScriptStep =
  | { kind: "text"; from: "me" | "them"; text: string }
  | { kind: "image"; from: "me" | "them"; src: string; caption?: string };

export type Fact = { icon: LucideIcon; label: string };
export type Interest = { label: string; icon: LucideIcon };

export type Conversation = {
  id: string;
  name: string;
  /** Dative form of the name, used in the chat composer placeholder
   *  ("Напишите {nameDative}…"). Russian name declensions are irregular
   *  (Данила → Даниле, Лев → Льву), so each name keeps its own form. */
  nameDative: string;
  /** Age is optional — omit it in the seed to hide the age entirely
   *  from the chat header and the profile panel. */
  age?: number;
  avatar: string;
  photos: string[];
  online: boolean;
  status: string;
  verified: boolean;
  city: string;
  distance: string;
  compatibility: number;
  about: string;
  facts: Fact[];
  interests: Interest[];
  matchedLabel: string;
  preview: {
    lastMessage: string;
    time: string;
    unread?: number;
    fromMe?: boolean;
    /** Read-receipt of the last outgoing message. Only meaningful when
     *  `fromMe` is true. Defaults to `true` for seeded history so old
     *  messages appear as already read. */
    read?: boolean;
  };
  suggestion: string;
  /** Full scripted dialog. Every scenario starts with `from: "them"`. */
  script: ScriptStep[];
};

/** Matches shown in the "Новые совпадения" strip */
export const newMatches = [
  { id: "n1", name: "Маэстро", avatar: "/profiles/maestro.jpg", isNew: true },
  { id: "n2", name: "Макс", avatar: "/profiles/match-4.jpg", isNew: true },
  { id: "n3", name: "Игорь", avatar: "/profiles/match-5.jpg" },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Маэстро",
    nameDative: "Маэстро",
    avatar: "/profiles/maestro-main.jpg",
    photos: ["/profiles/maestro-main.jpg", "/profiles/maestro-2.jpg", "/profiles/maestro-3.jpg"],
    online: true,
    status: "В сети · отвечает быстро",
    verified: true,
    city: "Артемьевск",
    distance: "4 км",
    compatibility: 94,
    about:
      "Состоявшийся мужчина старой школы. Ценю красоту, вкус и уважение к статусу. Люблю, когда женщина умеет держать себя.",
    facts: [
      { icon: Briefcase, label: "Бизнесмен" },
      { icon: GraduationCap, label: "Высшее" },
      { icon: MapPin, label: "Артемьевск · 8 км от вас" },
      { icon: Ruler, label: "182 см" },
      { icon: Wine, label: "Любит хорошее вино" },
    ],
    interests: [
      { label: "Рестораны", icon: Utensils },
      { label: "Антиквариат", icon: Gem },
      { label: "Охота", icon: Mountain },
      { label: "Дорогие вина", icon: WineIcon },
    ],
    matchedLabel: "Вы совпали сегодня",
    preview: {
      lastMessage: "Вы меня очаровали. Позвольте вас пригласить в ваш любимый «Купидон» через час",
      time: "только что",
      unread: 1,
    },
    suggestion: "Почему именно «Купидон»?",
    script: [
      {
        kind: "text",
        from: "them",
        text: "Вы меня очаровали. Позвольте вас пригласить в ваш любимый «Купидон» через час",
      },
      {
        kind: "text",
        from: "me",
        text: "Почему именно «Купидон»?",
      },
    ],
  },

  {
    id: "c2",
    name: "Алексей",
    nameDative: "Алексею",
    age: 38,
    avatar: "/profiles/aleksey-main.jpg",
    photos: ["/profiles/aleksey-main.jpg"],
    online: false,
    status: "Был в сети 20 минут назад",
    verified: false,
    city: "Артемьевск",
    distance: "4,5 км",
    compatibility: 71,
    about: "Без цирка и лишнего пафоса. Люблю честность, спокойные разговоры и когда человек не играет чужую роль.",
    facts: [
      { icon: Briefcase, label: "Следователь" },
      { icon: GraduationCap, label: "Юридическое" },
      { icon: MapPin, label: "Артемьевск · 4,5 км от вас" },
      { icon: Ruler, label: "179 см" },
      { icon: Wine, label: "Иногда" },
    ],
    interests: [
      { label: "Кино", icon: Film },
      { label: "Прогулки", icon: Footprints },
      { label: "Кофе", icon: Coffee },
    ],
    matchedLabel: "Вы совпали 3 дня назад",
    preview: {
      lastMessage: "Переписка не подтверждена сценарием",
      time: "—",
    },
    suggestion: "Нужен фрагмент сценария с его сообщениями",
    script: [
      // TODO:
      // В приложенном фрагменте сценария нет пригодимой чат-переписки Рыжова,
      // которую можно вставить сюда прямыми цитатами без додумывания.
    ],
  },

  {
    id: "c3",
    name: "Игорь",
    nameDative: "Игорю",
    age: 36,
    avatar: "/profiles/lelik-main.jpg",
    photos: ["/profiles/lelik-main.jpg"],
    online: true,
    status: "В сети",
    verified: true,
    city: "Артемьевск",
    distance: "4 км",
    compatibility: 89,
    about: "Лёгкий на подъём, обаятельный, умею делать женщину счастливой. Жизнь слишком коротка для скучных людей.",
    facts: [
      { icon: Briefcase, label: "Предприниматель" },
      { icon: GraduationCap, label: "Высшее" },
      { icon: MapPin, label: "Артемьевск · 2 км от вас" },
      { icon: Ruler, label: "183 см" },
      { icon: Wine, label: "Шампанское по поводу и без" },
    ],
    interests: [
      { label: "Путешествия", icon: Plane },
      { label: "Рестораны", icon: Utensils },
      { label: "Театр", icon: Drama },
      { label: "Авто", icon: Car },
    ],
    matchedLabel: "Вы совпали неделю назад",
    preview: {
      lastMessage: "Переписка не подтверждена сценарием",
      time: "—",
    },
    suggestion: "Нужен фрагмент сценария с его сообщениями",
    script: [
      // TODO:
      // В приложенном фрагменте сценария нет пригодимой чат-переписки Лёлика
      // прямыми цитатами. Текущие реплики нужно не выдумывать, а брать из сцен.
    ],
  },

  {
    id: "c4",
    name: "Макс",
    nameDative: "Максу",
    age: 28,
    avatar: "/profiles/max.webp",
    photos: ["/profiles/max.webp"],
    online: true,
    status: "В сети",
    verified: true,
    city: "Артемьевск",
    distance: "5 км",
    compatibility: 84,
    about: "Ресторатор. Люблю красивые места, лёгких людей и когда вечер складывается сам собой.",
    facts: [
      { icon: Briefcase, label: "Владелец ресторана «Купидон»" },
      { icon: GraduationCap, label: "Высшее" },
      { icon: MapPin, label: "Артемьевск · 5 км от вас" },
      { icon: Ruler, label: "186 см" },
      { icon: Wine, label: "Разбирается в винах" },
    ],
    interests: [
      { label: "Рестораны", icon: Utensils },
      { label: "Гастрономия", icon: CookingPot },
      { label: "Музыка", icon: Music },
      { label: "Город", icon: Building2 },
    ],
    matchedLabel: "Вы совпали недавно",
    preview: {
      lastMessage: "ПРИГЛАШЕНИЕ ОТ ТАКОЙ КРАСИВОЙ ДЕВУШКИ - БОЛЬШАЯ ЧЕСТЬ",
      time: "сегодня",
    },
    suggestion: "Я РАБОТАЮ В БИБЛИОТЕКЕ. СЕГОДНЯ У НАС ТЕАТРАЛИЗОВАННАЯ ПОСТАНОВКА. МОЖЕТ БЫТЬ ХОЧЕШЬ ПРИЙТИ?",
    script: [
      {
        kind: "text",
        from: "me",
        text: "МАКСИМ, ПРИВЕТ!",
      },
      {
        kind: "text",
        from: "me",
        text: "Я РАБОТАЮ В БИБЛИОТЕКЕ. СЕГОДНЯ У НАС ТЕАТРАЛИЗОВАННАЯ ПОСТАНОВКА. МОЖЕТ БЫТЬ ХОЧЕШЬ ПРИЙТИ?",
      },
      {
        kind: "text",
        from: "them",
        text: "ПРИГЛАШЕНИЕ ОТ ТАКОЙ КРАСИВОЙ ДЕВУШКИ - БОЛЬШАЯ ЧЕСТЬ",
      },
    ],
  },
];

/** "Heart" icon re-export so the chat view can decorate suggestion chips */
export { Heart as SuggestionIcon };
