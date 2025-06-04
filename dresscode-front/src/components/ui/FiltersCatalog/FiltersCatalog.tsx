import React, { useState } from "react";

const filterData = [
  {
    label: "Tipo de producto",
    options: ["Zapatillas", "Botines", "Sandalias"],
  },
  {
    label: "Categoria",
    options: ["Deportivo", "Casual", "Formal"],
  },
  {
    label: "Marca",
    options: ["NIKE", "ADIDAS", "PUMA", "VANS"],
  },
  {
    label: "Genero",
    options: ["Hombre", "Mujer", "Unisex"],
  },
];

export const FiltersCatalog = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: string]: string[] }>({});
  const [price, setPrice] = useState<[number, number]>([50000, 500000]);

  const toggleSection = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleCheck = (section: string, option: string) => {
    setChecked((prev) => {
      const current = prev[section] || [];
      return {
        ...prev,
        [section]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = Number(e.target.value);
    setPrice((prev) => {
      const newPrice: [number, number] = [...prev] as [number, number];
      newPrice[idx] = value;
      return newPrice;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes aplicar la lógica de filtrado o levantar los filtros al padre
    // Por ejemplo: onApplyFilters({ checked, price });
    // Por ahora solo mostramos por consola:
    console.log("Filtros aplicados:", { checked, price });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#181818",
        color: "#fff",
        width: 260,
        padding: 0,
        borderRadius: 4,
        fontFamily: "sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <style>
        {`
          .dropdown-content {
            overflow: hidden;
            transition: max-height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s;
            max-height: 0;
            opacity: 0;
          }
          .dropdown-content.open {
            max-height: 500px;
            opacity: 1;
          }
          .arrow {
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 8px;
            vertical-align: middle;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 7px solid #bdbdbd;
            transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          }
          .arrow.open {
            transform: rotate(180deg);
          }
        `}
      </style>
      <div style={{ flex: 1 }}>
        {filterData.map((section) => (
          <div key={section.label}>
            <div
              style={{
                background: "#2c2c2c",
                padding: "10px 16px",
                cursor: "pointer",
                borderBottom: "1px solid #333",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: 500,
                fontSize: 15,
                userSelect: "none",
              }}
              onClick={() => toggleSection(section.label)}
            >
              {section.label}
              <span className={`arrow${open[section.label] ? " open" : ""}`}></span>
            </div>
            <div
              className={`dropdown-content${open[section.label] ? " open" : ""}`}
              style={{
                background: "#181818",
                padding: open[section.label] ? "8px 24px" : "0 24px",
              }}
            >
              {section.options.map((option) => (
                <label
                  key={option}
                  style={{
                    display: "block",
                    margin: "6px 0",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked[section.label]?.includes(option) || false}
                    onChange={() => handleCheck(section.label, option)}
                    style={{ marginRight: 8 }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        {/* Rango de precio */}
        <div>
          <div
            style={{
              background: "#2c2c2c",
              padding: "10px 16px",
              cursor: "pointer",
              borderBottom: "1px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 500,
              fontSize: 15,
              userSelect: "none",
            }}
            onClick={() => toggleSection("Rango de precio")}
          >
            Rango de precio
            <span className={`arrow${open["Rango de precio"] ? " open" : ""}`}></span>
          </div>
          <div
            className={`dropdown-content${open["Rango de precio"] ? " open" : ""}`}
            style={{
              background: "#181818",
              padding: open["Rango de precio"] ? "16px 24px" : "0 24px",
            }}
          >
            <div style={{ marginBottom: 8, fontSize: 14 }}>
              Precio &nbsp;
              <span style={{ color: "#fff" }}>
                ${price[0].toLocaleString()} - ${price[1].toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={500000}
              step={1000}
              value={price[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              style={{ width: "100%" }}
            />
            <input
              type="range"
              min={50000}
              max={500000}
              step={1000}
              value={price[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              style={{ width: "100%", marginTop: 8 }}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        style={{
          margin: 24,
          marginTop: 32,
          padding: "12px 0",
          background: "#333",
          color: "#ccc",
          border: "none",
          borderRadius: 4,
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        APLICAR FILTROS
      </button>
    </form>
  );
};