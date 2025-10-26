export const Menubar = {
  create: function(objects, stylesheet = {}) {
    const bar = document.createElement("div");

    // Default styles
    const defaultStyle = {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "40px",
      background: "#1e1e1e",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      fontFamily: "Segoe UI, sans-serif",
      zIndex: "9999"
    };

    // Merge custom stylesheet
    Object.assign(bar.style, defaultStyle, stylesheet.bar || {});

    // Build menu items
    objects.forEach(obj => {
      const btn = document.createElement("button");
      btn.textContent = obj.label || "Item";

      const defaultBtn = {
        background: "transparent",
        border: "none",
        color: "#fff",
        marginRight: "15px",
        cursor: "pointer",
        fontSize: "15px"
      };

      Object.assign(btn.style, defaultBtn, stylesheet.button || {});

      btn.onmouseover = () => btn.style.color = (stylesheet.hoverColor || "#00bcd4");
      btn.onmouseout  = () => btn.style.color = (stylesheet.button?.color || "#fff");

      if (typeof obj.onclick === "function") btn.onclick = obj.onclick;
      bar.appendChild(btn);
    });

    document.body.style.paddingTop = (stylesheet.bar?.height || "40px");
    document.body.appendChild(bar);
    return bar;
  }
};