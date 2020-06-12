import React, { useEffect } from "react";

import { Container } from "./styles";

const Loading: React.FC = () => {
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  return (
    <Container>
      <div className="loader" />
    </Container>
  );
};

export default Loading;
