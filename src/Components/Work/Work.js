import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Work.css";
const Work = () => {
  const [myData, setMyData] = useState([]);

  const [maghta, setMaghta] = useState("");
  const [reshte, setreshte] = useState("");
  const [moadel, setMoadel] = useState("");
  const [sal, setSal] = useState("");
  const [name, setName] = useState("");

  const saveData = () => {
    setMyData((prev) => {
      const help = [...prev];
      const newData = [...help, { maghta, reshte, moadel, sal, name }];
      return newData;
    });
    setMaghta("");
    setreshte("");
    setMoadel("");
    setSal("");
    setName("");
  };

  const deleteProductHandler = (name) => {
    const products = [...myData];
    const newMyData = products.filter((i) => i.maghta !== name);
    setMyData(newMyData);
  };
  console.log(myData);
  return (
    <div>
      <div className="flex-container">
        <div className="flex-item">
          <p>مقطع</p>
          <input
            className="input02"
            onChange={(e) => setMaghta(e.target.value)}
            value={maghta}
          />{" "}
        </div>
        <div className="flex-item">
          {" "}
          <p>رشته</p>{" "}
          <input
            className="input02"
            onChange={(e) => setreshte(e.target.value)}
            value={reshte}
          />
        </div>
        <div className="flex-item">
          <p>معدل</p>
          <input
            className="input02"
            onChange={(e) => setMoadel(e.target.value)}
            value={moadel}
          />
        </div>
        <div className="flex-item">
          <p>سال</p>
          <input
            className="input02"
            onChange={(e) => setSal(e.target.value)}
            value={sal}
          />
        </div>
        <div className="flex-item">
          <p>نام دانشگاه</p>
          <input
            className="input02"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      </div>
      <div>
        <Button
          disabled={maghta && reshte && moadel && sal && name ? false : true}
          onClick={saveData}
        >
          اضافه کردن
        </Button>
      </div>
     

      {myData.length
        ? myData.map((i) => {
            return (
              <div className="flex-container">
                <div className="flex-item">
                  <p>مقطع</p>
                  <p>{i.maghta} </p>
                </div>
                <div className="flex-item">
                  <p>رشته</p>
                  <p>{i.maghta} </p>
                </div>
                <div className="flex-item">
                  <p>معدل</p>
                  <p>{i.maghta} </p>
                </div>
                <div className="flex-item">
                  <p>سال</p>
                  <p>{i.maghta} </p>
                </div>
                <div className="flex-item">
                  <p>نام دانشگاه</p>
                  <p>{i.maghta} </p>
                </div>
                <div className="flex-item">
                  <Button onClick={() => deleteProductHandler(i.maghta)}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Work;

/* <div className="flex-container">
        <div className="flex-item">
          <p>مقطع</p>
          <p>{myData[0].maghta } </p>
        </div>
        <div className="flex-item">
          <p>رشته</p>
          <p>{myData[0].maghta||  ''} </p>

        </div>
        <div className="flex-item">
          <p>معدل</p>
          <p>{myData[0].maghta||  ''} </p>

        </div>
        <div className="flex-item">
          <p>سال</p>
          <p>{myData[0].maghta ||  ''} </p>

        </div>
        <div className="flex-item">
          <p>نام دانشگاه</p>
          <p>{myData[0].maghta ||  ''} </p>

        </div>
      </div>  */
