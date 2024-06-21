import { useState, useEffect } from "react";
import Block from "../components/Block";
import { endpoint } from "../config/settings";

export const Blockchain = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetchBlockchain();
  }, []);

  const fetchBlockchain = async () => {
    try {
      const response = await fetch(endpoint.getBlockchain, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.data);

        setBlocks(result.data.chain);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="blocks">
      <h2 className="title">Blocks</h2>
      {blocks.map((block) => (
        <Block className="block" key={block.hash} block={block} />
      ))}
    </div>
  );
};
