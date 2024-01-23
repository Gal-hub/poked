import { useState } from "react";
import { Button } from "@mantine/core";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import "../assets/configurationPage.css"; 
import { NavbarMinimal } from "./navbar";

export function ConfigurationPage() {
  const savedConfig = localStorage.getItem("config");
  const [config, setConfig] = useState(
    savedConfig ? JSON.parse(savedConfig) : {}
  );

  const handleSave = () => {
    localStorage.setItem("config", JSON.stringify(config));
  };

  return (
    <div>
      <div className="editor">
      <NavbarMinimal />
        <Editor
          value={config}
          onChange={setConfig}
          mode="code"
          indentation={2}
        />
      </div>
      <Button onClick={handleSave}>Save Configuration</Button>
    </div>
  );
}
