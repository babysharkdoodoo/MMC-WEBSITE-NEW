// ── /lib/topics.ts ────────────────────────────────────────────────────────────
// Utility to load topic data from /content/topics/*.json
// Usage: import { getAllTopics, getTopicById } from "@/lib/topics"

export interface TopicSection {
  heading: string;
  body: string;
}

export interface Topic {
  id: string;
  title: string;
  tagline: string;
  icon: string;          // Using emojis for a younger, more engaging vibe
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  tags: string[];
  description: string;
  image: string;
  sections: TopicSection[];
  keyFacts: string[];
  problems: Array<{ question: string; hint: string }>;
  relatedIds: string[];
}

// ── All topics data (add new topics here or move to JSON files) ──────────────
export const TOPICS: Topic[] = [
  {
    id: "number-theory",
    title: "Number Theory",
    tagline: "The secret codes of math",
    icon: "🔢",
    level: "All Levels",
    tags: ["primes", "divisibility", "clocks"],
    description: "Dive into the hidden patterns of whole numbers. From unbreakable prime numbers to the 'clock math' that keeps your online game accounts safe!",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "The Atoms of Math", body: "Think of prime numbers (like 2, 3, 5, 7) as the atomic building blocks of math. Every other number can be built by multiplying primes together. Even though they seem simple, primes are so unpredictable that mathematicians are still trying to crack their patterns today!" },
      { heading: "Clock Math", body: "If it's 10:00 AM and you play a game for 4 hours, it's not 14:00 AM—it's 2:00 PM. You just did modular arithmetic! This looping 'clock math' is the secret ingredient behind the passwords and encryption that protect everything on the internet." },
      { heading: "Unsolved Mysteries", body: "Math isn't finished! There are still questions about numbers that a 10-year-old can understand but the smartest supercomputers can't solve. For example: can every even number be split into two prime numbers? We think so, but nobody has ever proven it!" },
    ],
    keyFacts: [
      "The biggest known prime number is so huge, it would take you over 100 days just to write it down!",
      "Zero wasn't always a number. It was invented in ancient India and completely changed the world.",
      "Cicadas (a type of bug) use prime numbers for their hibernation cycles to avoid predators.",
      "Your Wi-Fi password is protected by math equations that use giant prime numbers."
    ],
    problems: [
      { question: "If you multiply two odd numbers, will the answer be odd or even?", hint: "Try testing it out with a few small odd numbers like 3x3 or 5x7. Notice a pattern?" },
      { question: "What is the smallest number that can be divided evenly by 1, 2, 3, 4, and 5?", hint: "You don't need to multiply them all together. Look at the numbers carefully—4 is just 2x2!" },
      { question: "If today is Tuesday, what day of the week will it be 100 days from now?", hint: "Use 'clock math' but for days of the week. Divide 100 by 7 and look at the remainder." },
    ],
    relatedIds: ["cryptography", "combinatorics"],
  },
  {
    id: "graph-theory",
    title: "Graph Theory",
    tagline: "Connecting the dots of the universe",
    icon: "🕸️",
    level: "Beginner",
    tags: ["networks", "maps", "friends"],
    description: "The ultimate math of connections. Discover the hidden webs that power social media, Google Maps, and video game worlds.",
    image: "https://images.unsplash.com/photo-1520869562399-e772f042f422?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "What is a Graph?", body: "Forget bar charts! In this kind of math, a 'graph' is just a bunch of dots (vertices) connected by lines (edges). A map of cities connected by highways is a graph. Your friends list on Discord or Roblox is also a graph!" },
      { heading: "The Seven Bridges Puzzle", body: "Graph theory started in 1736 with a riddle. A city called Königsberg had seven bridges. The mayor wanted to know: could you walk through the city crossing every bridge exactly once? A mathematician named Euler proved it was impossible, inventing a whole new branch of math to do it." },
      { heading: "Coloring the World", body: "Imagine you're drawing a map of the world and don't want any touching countries to be the same color. What's the smallest number of crayons you need? Graph theory proves you only ever need four crayons, no matter how crazy the map is!" },
    ],
    keyFacts: [
      "The 'Six Degrees of Kevin Bacon' game works because of graph theory.",
      "Google's search engine was built using a giant graph of the internet.",
      "It took a supercomputer to finally prove the Four Color Map Theorem in 1976.",
      "You can use graphs to figure out the fastest way to beat a video game level."
    ],
    problems: [
      { question: "Try to draw a square with an X inside it without lifting your pencil and without tracing over the same line twice. Can you do it?", hint: "Count the number of lines connecting to each corner. Euler had a rule about odd and even connections!" },
      { question: "Imagine a party with 5 people. Everyone shakes hands with everyone else exactly once. How many handshakes happen?", hint: "Draw 5 dots in a circle and connect every dot to every other dot. Count the lines!" },
      { question: "Can you color a checkerboard using only 2 colors so no touching squares (up/down/left/right) are the same color?", hint: "You already know what a checkerboard looks like! This is a simple graph coloring problem." },
    ],
    relatedIds: ["topology", "combinatorics"],
  },
  {
    id: "topology",
    title: "Topology",
    tagline: "Math made of playdough",
    icon: "🍩",
    level: "Intermediate",
    tags: ["shapes", "dimensions", "stretching"],
    description: "Welcome to the weird world of flexible geometry, where you can stretch, squish, and twist shapes—and where a coffee mug is exactly the same as a donut!",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "The Rules of the Squish", body: "In regular geometry, size and angles matter. In topology, everything is made of magical, stretchy playdough. You can pull, bend, and twist a shape all you want. The only rules are: you can't poke any new holes, and you can't glue things together." },
      { heading: "Donuts and Coffee Cups", body: "To a topologist, a donut and a coffee cup with a handle are the exact same shape! Why? Because they both have exactly one hole. If your coffee cup was made of playdough, you could squish the cup part flat and be left with just the handle—which is a donut shape." },
      { heading: "The Infinite Loop", body: "Take a strip of paper, give it one half-twist, and tape the ends together. You just made a Möbius strip! It's a mind-bending shape that only has ONE side. If you draw a line down the middle, you'll end up exactly where you started, covering both 'sides' without ever crossing an edge." },
    ],
    keyFacts: [
      "In topology, a human being is technically a shape with 7 holes (count them!).",
      "A Klein bottle is a 3D shape that has no inside and no outside.",
      "Solving a massive topology puzzle called the Poincaré Conjecture won a mathematician $1 million (but he turned down the money!).",
      "Topology is used to understand the shape of the entire universe."
    ],
    problems: [
      { question: "If you take scissors and cut a Möbius strip perfectly down the middle, what shape will you get?", hint: "Try making one with paper and tape, then actually cut it! You'll be shocked by the result." },
      { question: "How many holes does a CD or DVD have?", hint: "Think about the donut. Does a CD have an inside and an outside?" },
      { question: "If a bowling ball is squished flat like a pancake, is it topologically the same shape?", hint: "Remember the rules of the squish: did you poke any holes or tear the object?" },
    ],
    relatedIds: ["graph-theory", "fractals"],
  },
  {
    id: "game-theory",
    title: "Game Theory",
    tagline: "The science of outsmarting your opponent",
    icon: "🎮",
    level: "Beginner",
    tags: ["strategy", "winning", "logic"],
    description: "Learn the math behind making the perfect choices. Whether you're playing board games, trading Pokémon cards, or sharing a pizza, Game Theory helps you win.",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "How to Play Perfect", body: "Game theory isn't just about video games. It's the math of predicting what other people will do. If you and your friend both want the last slice of pizza, what's the fairest way to split it? (Hint: One person cuts, the other chooses the slice!)" },
      { heading: "The Prisoner's Dilemma", body: "Imagine you and your partner get caught pulling a prank. The principal puts you in separate rooms. If you both stay silent, you get 1 day of detention. If you blame your partner and they stay silent, you get zero detention and they get a week! What do you do? This puzzle explains how humans handle trust." },
      { heading: "Nash Equilibrium", body: "Named after mathematician John Nash, this is the 'sweet spot' in any game where nobody wants to change their strategy because they're doing the best they possibly can against their opponent. Once you find the equilibrium, you've essentially 'solved' the game." },
    ],
    keyFacts: [
      "Rock-Paper-Scissors has a perfect mathematical strategy: just be completely random!",
      "Game theory is used by video game developers to balance characters and weapons.",
      "Animals use evolutionary game theory to decide whether to fight or share food.",
      "Many economists have won the Nobel Prize for using Game Theory to study how people spend money."
    ],
    problems: [
      { question: "In Tic-Tac-Toe, if both players play perfectly, what is the result?", hint: "Think about your own games. Has anyone ever won when both of you were really paying attention?" },
      { question: "You're playing a game where you and a friend pick a number from 1 to 10. The person who picks the lower number wins that many coins. What number should you pick?", hint: "If you pick 10, they pick 9. If they pick 9, you pick 8. Where does this cycle stop?" },
      { question: "How can you win a game of Rock-Paper-Scissors against someone who always plays Rock 50% of the time?", hint: "If they play Rock half the time, what move should you start spamming?" },
    ],
    relatedIds: ["combinatorics", "probability"],
  },
  {
    id: "fractals",
    title: "Fractals & Chaos",
    tagline: "Infinite loops and butterfly wings",
    icon: "🌌",
    level: "Beginner",
    tags: ["infinity", "patterns", "nature"],
    description: "Discover the trippy, zooming patterns of fractals and the wild world of Chaos Theory, where tiny changes can cause massive explosions of unpredictability.",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "The Infinite Zoom", body: "A fractal is a pattern that repeats forever. If you zoom in on a fractal, the tiny pieces look exactly like the whole giant picture. It's like a mathematical magic trick. You can generate incredibly complex worlds (like in Minecraft!) using very simple repeating fractal rules." },
      { heading: "Math in the Wild", body: "Look out your window—fractals are everywhere! The way a tree branches out, the jagged edges of a coastline, a lightning strike, and the intricate crystals of a snowflake are all natural fractals. Nature uses math to build beautiful things." },
      { heading: "The Butterfly Effect", body: "Chaos theory studies systems that are incredibly sensitive. The 'Butterfly Effect' asks: could a butterfly flapping its wings in Brazil cause a tornado in Texas weeks later? Because weather is so complex, tiny unnoticeable changes snowball into massive differences." },
    ],
    keyFacts: [
      "The Mandelbrot set is considered the most complex mathematical object in existence.",
      "Your lungs and blood vessels are shaped like fractals to save space in your body.",
      "CGI in movies uses fractals to generate realistic landscapes, mountains, and clouds.",
      "Because of chaos theory, it's mathematically impossible to predict the weather perfectly more than a couple of weeks in advance."
    ],
    problems: [
      { question: "Draw a triangle. Now draw an upside-down triangle inside it. Keep drawing triangles inside the blank spaces. What happens?", hint: "This is called the Sierpiński triangle. It's one of the easiest fractals to draw by hand!" },
      { question: "If you zoom into a snowflake forever, will you ever reach a smooth edge?", hint: "Remember the definition of a true fractal—it's about infinite repetition." },
      { question: "Why is it easier to predict the path of a comet than the weather next Friday?", hint: "Think about the 'Butterfly Effect' and how many tiny variables (wind, heat, moisture) change the weather." },
    ],
    relatedIds: ["topology", "probability"],
  },
  {
    id: "combinatorics",
    title: "Combinatorics",
    tagline: "The ultimate cheat code for counting",
    icon: "🧩",
    level: "Beginner",
    tags: ["counting", "combinations", "puzzles"],
    description: "How many ways can you build a Minecraft house? How many possible passwords exist? Combinatorics is the super-powered art of counting without actually counting.",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "Super Speed Counting", body: "If you have 3 shirts, 4 pairs of pants, and 2 pairs of shoes, how many outfits can you make? You don't need to lay them all out on your bed to know the answer. Combinatorics gives you shortcuts (like 3 × 4 × 2 = 24 outfits) to calculate huge possibilities instantly." },
      { heading: "The Pigeonhole Principle", body: "This rule sounds silly but it's super powerful: If you have 10 pigeons and only 9 pigeonholes to put them in, at least one hole MUST have two pigeons sharing it. Mathematicians use this simple logic to prove mind-blowing facts about the world." },
      { heading: "Permutations vs Combinations", body: "Does order matter? If you're guessing a bike lock code (1-2-3 is different from 3-2-1), you're dealing with permutations. If you're picking toppings for a pizza (pepperoni and mushroom is the same as mushroom and pepperoni), that's a combination!" },
    ],
    keyFacts: [
      "There are more ways to shuffle a deck of 52 cards than there are atoms in the Earth.",
      "If you shuffle a deck of cards properly, that exact sequence of cards has likely never existed before in history.",
      "There are 43,252,003,274,489,856,000 ways to scramble a Rubik's Cube.",
      "Because of the Pigeonhole Principle, there are definitely two people in your city with the exact same number of hairs on their head!"
    ],
    problems: [
      { question: "You have 4 different colors of paint to paint a stripe on your wall. How many different 3-color stripes can you paint?", hint: "You have 4 choices for the first color, 3 for the second, and 2 for the third. Multiply them!" },
      { question: "In a class of 30 students, why is it practically guaranteed that two people share the same birth month?", hint: "How many months are in a year? Apply the Pigeonhole Principle!" },
      { question: "If you have 5 friends, how many different ways can you line up for a photo?", hint: "Think about who goes first (5 choices), second (4 choices), and so on." },
    ],
    relatedIds: ["number-theory", "probability"],
  },
  {
    id: "cryptography",
    title: "Cryptography",
    tagline: "Spy codes and secret messages",
    icon: "🕵️‍♂️",
    level: "Intermediate",
    tags: ["hacking", "secrets", "passwords"],
    description: "Enter the world of digital spies. Learn how math transforms your text messages, passwords, and private data into unbreakable gibberish to block hackers.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "The Caesar Cipher", body: "Over 2,000 years ago, Julius Caesar hid his military plans by shifting the alphabet. 'A' became 'D', 'B' became 'E', and so on. If you wrote 'CAT', it would look like 'FDW'. This is a simple cipher, and today's hackers could crack it in a fraction of a second." },
      { heading: "Modern Day Lock & Key", body: "Today, your web browser uses public-key cryptography. It's like having a padlock that anyone can click shut (to send you a message), but only YOU have the key to open it (to read the message). The 'padlock' and the 'key' are made of giant math equations!" },
      { heading: "The Future of Secrets", body: "Scientists are building Quantum Computers—machines so powerful they could break all of today's passwords in minutes. Cryptographers are racing against the clock right now to invent 'Post-Quantum' math codes to save the internet before that happens." },
    ],
    keyFacts: [
      "The 'S' in HTTPS stands for 'Secure'—it means cryptography is actively protecting your connection.",
      "During World War II, Alan Turing built one of the first computers to crack the unbreakable Enigma code.",
      "A completely random password like 'p9$Fg2!' is actually harder to crack than 'Monkey123'.",
      "Cryptocurrency like Bitcoin is entirely powered by cryptographic math."
    ],
    problems: [
      { question: "Using a Caesar shift of +1 (A becomes B, B becomes C), decode this secret message: 'IFMMP'.", hint: "Just step backwards one letter in the alphabet for each letter." },
      { question: "Why is it a bad idea to use your pet's name as your password?", hint: "Think about how hackers guess. Is your pet's name public knowledge on your social media?" },
      { question: "If a hacker can guess 10,000 passwords a second, why are 12-letter passwords still safe?", hint: "Because the number of combinations multiplies exponentially. A 12-letter password has trillions of possibilities." },
    ],
    relatedIds: ["number-theory", "combinatorics"],
  },
  {
    id: "probability",
    title: "Probability & Statistics",
    tagline: "The math of luck and loot drops",
    icon: "🎲",
    level: "Beginner",
    tags: ["luck", "predictions", "data"],
    description: "Can you calculate your chances of winning the lottery, landing a critical hit, or pulling a legendary item? Master the math of predicting the unpredictable.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&h=500&q=80",
    sections: [
      { heading: "Measuring Luck", body: "Probability is just putting a number on how likely something is to happen. 0 means completely impossible. 1 means completely guaranteed. Flipping a coin is exactly 0.5 (or 50%). Whether you're playing a tabletop RPG or a mobile gacha game, it all runs on probability math." },
      { heading: "The Gambler's Fallacy", body: "If you flip a coin and get 'Heads' 5 times in a row, you might think, 'Tails is definitely next!' Wrong. The coin has no memory. The chance of tails is still exactly 50%. Believing the odds change based on the past is called the Gambler's Fallacy." },
      { heading: "The Bell Curve", body: "If you measure the height of every student in your school and graph it, most people will be in the middle (average), with a few very short people and a few very tall people on the edges. This shape is called the Normal Distribution, and it appears almost everywhere in nature!" },
    ],
    keyFacts: [
      "In a room of just 23 people, there is a better-than-50% chance that two of them share a birthday!",
      "You are more likely to get struck by lightning than to win a mega lottery jackpot.",
      "If you buy a '1% drop rate' item box 100 times, you are NOT guaranteed to get it. You only have a 63% chance!",
      "Machine learning and AI bots (like this one!) operate heavily on probability math to predict what word should come next."
    ],
    problems: [
      { question: "If you roll a standard 6-sided die, what are the odds of rolling an even number?", hint: "Count the even numbers (2, 4, 6) and divide by the total number of sides." },
      { question: "There are 3 red marbles and 2 blue marbles in a bag. You close your eyes and pick one. What is the probability it's blue?", hint: "Take the number of blue marbles and divide it by the total number of marbles." },
      { question: "Let's say a game boss drops a rare sword 10% of the time. If you beat him 10 times, why aren't you guaranteed the sword?", hint: "Every battle is an independent event. The boss doesn't remember your past fights!" },
    ],
    relatedIds: ["combinatorics", "game-theory"],
  },
];

export function getAllTopics(): Topic[] {
  return TOPICS;
}

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}

export function getRelatedTopics(id: string): Topic[] {
  const topic = getTopicById(id);
  if (!topic) return [];
  return topic.relatedIds.map((rid) => getTopicById(rid)).filter(Boolean) as Topic[];
}

export function generateTopicStaticParams() {
  return TOPICS.map((t) => ({ id: t.id }));
}