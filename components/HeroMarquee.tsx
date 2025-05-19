import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";


const reviews = [
  {
    name: "Ava Martinez",
    username: "@avamartinez",
    body: "This app helped me turn my class notes and readings into practice quizzes. It’s been a game changer for staying on top of material.",
    img: "https://avatar.vercel.sh/avamartinez",
  },
  {
    name: "Liam Patel",
    username: "@liampatel",
    body: "I used it to generate quizzes from a PDF textbook before finals — it made studying so much more efficient and focused.",
    img: "https://avatar.vercel.sh/liampatel",
  },
  {
    name: "Sophia Nguyen",
    username: "@sophia_ng",
    body: "Being able to just paste a prompt and get a quiz instantly has really helped me test my understanding before exams.",
    img: "https://avatar.vercel.sh/sophia_ng",
  },
  {
    name: "Noah Johnson",
    username: "@noahj",
    body: "This app makes studying less stressful. I get quick quizzes from my readings and it really helps with retention.",
    img: "https://avatar.vercel.sh/noahj",
  },
  {
    name: "Isabella Lee",
    username: "@isabellalee",
    body: "I’ve used it for everything from biology to history. Upload a PDF, get a quiz — it’s that simple and super effective.",
    img: "https://avatar.vercel.sh/isabellalee",
  },
  {
    name: "Ethan Brooks",
    username: "@ethanb",
    body: "Honestly, I wish I had this app sooner. It takes the guesswork out of review sessions and gives me exactly what I need to focus on.",
    img: "https://avatar.vercel.sh/ethanb",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function HeroMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
