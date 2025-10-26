import { useState, useEffect } from "react";

interface TypewriterHeading {
  line1: string;
  line2: string;
}

interface UseTypewriterReturn {
  displayedLine1: string;
  displayedLine2: string;
  showCursorOnLine1: boolean;
}

export const useTypewriter = (
  headings: TypewriterHeading[]
): UseTypewriterReturn => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [isTypingLine1, setIsTypingLine1] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [showCursorOnLine1, setShowCursorOnLine1] = useState(true);

  useEffect(() => {
    const currentHeading = headings[currentHeadingIndex];
    const fullLine1 = currentHeading.line1;
    const fullLine2 = currentHeading.line2;

    const typewriterTimeout = setTimeout(() => {
      if (!isDeleting) {
        if (isTypingLine1) {
          if (displayedLine1.length < fullLine1.length) {
            setDisplayedLine1(
              fullLine1.substring(0, displayedLine1.length + 1)
            );
            setShowCursorOnLine1(true);
            setTypingSpeed(80);
          } else {
            // Finished line 1, start line 2
            setIsTypingLine1(false);
            setShowCursorOnLine1(false);
            setTypingSpeed(200);
          }
        } else {
          // Typing line 2
          if (displayedLine2.length < fullLine2.length) {
            setDisplayedLine2(
              fullLine2.substring(0, displayedLine2.length + 1)
            );
            setShowCursorOnLine1(false);
            setTypingSpeed(80);
          } else {
            // Finished both lines, wait 10 seconds then start deleting
            setTypingSpeed(10000);
            setIsDeleting(true);
          }
        }
      } else {
        // Deleting backward
        if (displayedLine2.length > 0) {
          // Delete line 2 first
          setDisplayedLine2(fullLine2.substring(0, displayedLine2.length - 1));
          setShowCursorOnLine1(false);
          setTypingSpeed(40);
        } else if (displayedLine1.length > 0) {
          // Then delete line 1
          setDisplayedLine1(fullLine1.substring(0, displayedLine1.length - 1));
          setShowCursorOnLine1(true);
          setTypingSpeed(40);
        } else {
          // Finished deleting, move to next heading
          setIsDeleting(false);
          setIsTypingLine1(true);
          setShowCursorOnLine1(true);
          setCurrentHeadingIndex(
            (prevIndex) => (prevIndex + 1) % headings.length
          );
          setTypingSpeed(500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typewriterTimeout);
  }, [
    displayedLine1,
    displayedLine2,
    isTypingLine1,
    isDeleting,
    currentHeadingIndex,
    typingSpeed,
    headings,
  ]);

  return {
    displayedLine1,
    displayedLine2,
    showCursorOnLine1,
  };
};
