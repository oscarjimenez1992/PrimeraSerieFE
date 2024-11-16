// app/page.tsx
"use client";

import { fetchExchangeRate } from "../utils/fetchExchangeRate";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<{ Fecha: string; TipoCambio: string } | null>(null);
  const [lastFetchedTime, setLastFetchedTime] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchExchangeRate();
      setExchangeRate(data);
      const currentTime = new Date().toLocaleTimeString();
      setLastFetchedTime(currentTime);
    } catch (error) {
      console.error("Error al obtener el tipo de cambio:", error);
    }
    setTimeout(() => setIsRefreshing(false), 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!exchangeRate) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.refreshButton} onClick={getData} disabled={isRefreshing}>
        Refrescar
      </button>
      {isRefreshing && <div className={styles.progressBar}></div>}
      <div className={`${styles.date} ${isRefreshing ? styles.faded : ""}`}>{exchangeRate.Fecha}</div>
      <div className={`${styles.exchangeRate} ${isRefreshing ? styles.faded : ""}`}>
        Tipo de Cambio: {exchangeRate.TipoCambio}
      </div>
      <div className={`${styles.timeFetched} ${isRefreshing ? styles.faded : ""}`}>
        Consulta realizada a las: {lastFetchedTime}
      </div>
      <footer className={styles.footer}>
        <p>Oscar Antonio Jiménez Juárez</p>
        <p>Carnet: 5190-14-4462</p>
        <p>Email: ojimenezj@miumg.edu.gt</p>
      </footer>
    </div>
  );
}
