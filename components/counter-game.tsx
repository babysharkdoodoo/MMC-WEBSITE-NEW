"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

type Turn = "you" | "computer" | "won" | "lost";

export default function CounterGame() {
  const [left, setLeft] = useState(15);
  const [turn, setTurn] = useState<Turn>("you");
  const [message, setMessage] = useState("Your move. Take one, two, or three.");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setLeft(15); setTurn("you"); setMessage("Fresh start. You go first.");
  }

  function take(amount: number) {
    if (turn !== "you" || amount > left) return;
    const after = left - amount;
    setLeft(after);
    if (after === 0) { setTurn("won"); setMessage("You got the last one. Nicely played!"); return; }
    setTurn("computer"); setMessage(`You took ${amount}. My turn…`);
    timer.current = setTimeout(() => {
      const reply = after % 4 || 1;
      const remaining = after - reply;
      setLeft(remaining);
      setTurn(remaining === 0 ? "lost" : "you");
      setMessage(remaining === 0 ? `I took ${reply} and got the last one. Try a different first move?` : `I took ${reply}. Your turn.`);
    }, 650);
  }

  return (
    <div className="counter-game" data-ui="counter-game">
      <div className="game-top"><span>{left} counters left</span><button onClick={reset} className="reset-game"><RotateCcw size={17} /> Start again</button></div>
      <div className="counter-board" role="img" aria-label={`${left} of 15 counters remain`}>
        {Array.from({ length: 15 }, (_, i) => <span key={i} className={`counter ${i >= left ? "counter-gone" : ""}`} aria-hidden="true" />)}
      </div>
      <p className="game-message" aria-live="polite" aria-atomic="true">{message}</p>
      <div className="game-actions" aria-label="Choose how many counters to take">
        {[1, 2, 3].map(n => <button key={n} onClick={() => take(n)} disabled={turn !== "you" || n > left}>Take {n}</button>)}
      </div>
      <details className="game-hint"><summary>What’s the trick?</summary><p>Work backward. With four counters left, whoever goes next loses against careful play. Can you keep leaving your opponent a multiple of four? Start with 15 and see what your first move should be.</p></details>
    </div>
  );
}
