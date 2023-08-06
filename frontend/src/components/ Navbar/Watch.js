import React, { useEffect, useState } from "react";

const Watch = () => {
  let time = new Date();
  function addZ(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  const [date, setDate] = useState(
    `${addZ(time.getDate())}.${addZ(
      time.getMonth()
    )}.${time.getFullYear()}, ${addZ(time.getHours())}:${addZ(
      time.getMinutes()
    )}`
  );

  useEffect(() => {
    let timer = setInterval(() => {
      setDate(
        `${addZ(time.getDate())}.${addZ(
          time.getMonth()
        )}.${time.getFullYear()}, ${addZ(time.getHours())}:${addZ(
          time.getMinutes()
        )}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      {date.toString()}
    </div>
  );
};

export default Watch;
