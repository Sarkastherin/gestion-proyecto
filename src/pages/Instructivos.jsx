import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Container from "../components/Generals/Container";
import { BoxComponentScrolling } from "../components/BoxComponent";
const Instructivos = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("Oportunidades.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  return (
    <>
      <Container text={"Instructivos"} to={"/"}>
        <BoxComponentScrolling title="..." height="calc(100vh - 5rem)">
          <section className="markdown min-h-screen py-10 px-16 max-w-5xl mx-auto">
            <Markdown>{markdown}</Markdown>
          </section>
        </BoxComponentScrolling>
      </Container>
    </>
  );
};

export default Instructivos;
