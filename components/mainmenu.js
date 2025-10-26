export const Menubar = {
  create: function(objects, stylesheet = {}) {
    const bar = document.createElement("div");

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
      zIndex: "9999",
      userSelect: "none"
    };
    Object.assign(bar.style, defaultStyle, stylesheet.bar || {});

    const defaultBtn = {
      background: "transparent",
      border: "none",
      color: "#fff",
      marginRight: "15px",
      cursor: "pointer",
      fontSize: "15px",
      display: "flex",
      alignItems: "center",
      position: "relative"
    };

    const createButton = (obj) => {
      const btn = document.createElement("button");
      Object.assign(btn.style, defaultBtn, stylesheet.button || {});
      btn.innerHTML = `${obj.icon ? `<i class="${obj.icon}" style="margin-right:6px"></i>` : ""}${obj.label || "Item"}`;
      btn.onmouseover = () => btn.style.color = (stylesheet.hoverColor || "#00bcd4");
      btn.onmouseout  = () => btn.style.color = (stylesheet.button?.color || "#fff");

      if (typeof obj.onclick === "function") btn.onclick = obj.onclick;

      // Submenu support
      if (Array.isArray(obj.children) && obj.children.length > 0) {
        const submenu = document.createElement("div");
        submenu.style.position = "absolute";
        submenu.style.top = "100%";
        submenu.style.left = "0";
        submenu.style.background = stylesheet.submenu?.background || "#2a2a2a";
        submenu.style.minWidth = "150px";
        submenu.style.padding = "5px 0";
        submenu.style.display = "none";
        submenu.style.flexDirection = "column";
        submenu.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)";
        submenu.style.borderRadius = "4px";

        obj.children.forEach(child => {
          const item = document.createElement("div");
          item.textContent = child.label || "Subitem";
          item.style.padding = "8px 12px";
          item.style.color = "#fff";
          item.style.cursor = "pointer";
          item.style.fontSize = "14px";
          item.onmouseover = () => item.style.background = stylesheet.submenu?.hoverBackground || "#3a3a3a";
          item.onmouseout  = () => item.style.background = "transparent";
          if (typeof child.onclick === "function") item.onclick = child.onclick;
          submenu.appendChild(item);
        });

        btn.appendChild(submenu);

        btn.onmouseenter = () => submenu.style.display = "flex";
        btn.onmouseleave = () => submenu.style.display = "none";
      }

      return btn;
    };

    objects.forEach(obj => bar.appendChild(createButton(obj)));

    document.body.style.paddingTop = (stylesheet.bar?.height || "40px");
    document.body.appendChild(bar);
    return bar;
  }
};
