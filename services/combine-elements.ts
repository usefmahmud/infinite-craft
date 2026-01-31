export const combineElements = async (word1: string, word2: string) => {
  return await fetch(`api/combine?word1=${word1}&word2=${word2}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
