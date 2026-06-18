"use client";

import { useState, useEffect } from "react";

/** Types a single string once, then blinks cursor briefly and stops. */
export function useSingleTypewriter(text: string, speed = 80, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Type then stop cursor after settling
  useEffect(() => {
    if (!text) return;
    let interval: ReturnType<typeof setInterval>;
    let cursorTimeout: ReturnType<typeof setTimeout>;

    const startTimeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          // Keep cursor blinking for 1.5s then hide it
          cursorTimeout = setTimeout(() => setShowCursor(false), 1500);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
      clearTimeout(cursorTimeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done, showCursor };
}

type CyclingOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  startDelay?: number;
};

/** Cycles through an array of words with type → pause → delete → next loop. */
export function useCyclingTypewriter(words: string[], opts: CyclingOptions = {}) {
  const {
    typingSpeed = 75,
    deletingSpeed = 45,
    pauseAfterType = 2200,
    pauseAfterDelete = 400,
    startDelay = 0,
  } = opts;

  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "pausing" | "deleting">("idle");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (words.length === 0) return;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      timeout = setTimeout(() => setPhase("typing"), startDelay);
    } else if (phase === "typing") {
      const target = words[wordIndex];
      if (displayed.length < target.length) {
        timeout = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          typingSpeed
        );
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deletingSpeed
        );
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, displayed, wordIndex, words, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, startDelay]);

  return { displayed, showCursor };
}
