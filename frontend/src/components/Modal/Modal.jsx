import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({ guessedLetters, step, text }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const guessedLettersSet = new Set(guessedLetters);
  const textSet = new Set(text.toUpperCase());

  const [modalHeadText, setModalHeadText] = useState("");
  const [modalParaText, setModalParaText] = useState("");
  const [modalBtnText, setModalBtnText] = useState("");

  useEffect(() => {
    if (step > 6) {
      setIsOpen(true);
      setModalHeadText("Game Over ☹️");
      setModalParaText("Oops! You were not able to Guess the Word");
      setModalBtnText("Play Again 🚀");
    }

    const allLettersGuessed = [...textSet].every((letter) =>
      guessedLettersSet.has(letter)
    );

    if (allLettersGuessed) {
      setIsOpen(true);
      setModalHeadText("Game Won 🔥🔥");
      setModalParaText("Yay! You Guessed the Word");
      setModalBtnText("Play Again 🚀");
    }
  }, [guessedLetters, text, step, textSet, guessedLettersSet]);

  function close() {
    setIsOpen(false);
    navigate("/home");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="text-lg font-semibold">{modalHeadText}</div>
          <div>{modalParaText}</div>
        </div>
        <DialogFooter>
          <Button onClick={close}>
            {modalBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
