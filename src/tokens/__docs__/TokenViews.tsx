import type { CSSProperties, ReactNode } from "react";
import {
  colorTokensDefinition,
  component,
  semantic,
  spacingTokenOrder,
  spacingTokensDefinition,
  typographyTokensDefinition,
} from "../index";

const pageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 32,
  padding: 24,
  fontFamily: typographyTokensDefinition["body-m"].fontFamily,
  color: colorTokensDefinition.OnNeutral,
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: typographyTokensDefinition["body-m"].fontSize,
  fontWeight: 700,
  lineHeight: typographyTokensDefinition["body-m"].lineHeight,
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: 16,
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 12,
  borderRadius: spacingTokensDefinition["3XS"].rem,
  border: `1px solid ${colorTokensDefinition.Outline}`,
  background: colorTokensDefinition.SurfaceHover,
};

const metaStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  fontSize: typographyTokensDefinition["body-s"].fontSize,
  color: colorTokensDefinition.InverseActive,
  wordBreak: "break-word",
};

const nameStyle: CSSProperties = {
  fontWeight: 700,
  color: colorTokensDefinition.OnNeutral,
  fontSize: typographyTokensDefinition["body-s"].fontSize,
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={sectionTitleStyle}>{title}</h2>
      {children}
    </section>
  );
}

function TokenCard({
  name,
  value,
  preview,
}: {
  name: string;
  value: string;
  preview: ReactNode;
}) {
  return (
    <div style={cardStyle}>
      {preview}
      <div style={metaStyle}>
        <span style={nameStyle}>{name}</span>
        <code>{value}</code>
      </div>
    </div>
  );
}

function ColorSwatch({ value }: { value: string }) {
  return (
    <div
      style={{
        height: 64,
        borderRadius: spacingTokensDefinition["3XS"].rem,
        background: value,
        border: `1px solid ${colorTokensDefinition.Outline}`,
      }}
      title={value}
    />
  );
}

export function ColorTokensView() {
  return (
    <div style={pageStyle}>
      <Section title="Color (Figma)">
        <div style={gridStyle}>
          {Object.entries(colorTokensDefinition).map(([name, value]) => (
            <TokenCard
              key={name}
              name={name}
              value={value}
              preview={<ColorSwatch value={value} />}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function SpacingTokensView() {
  return (
    <div style={pageStyle}>
      <Section title="Spacing (Figma)">
        <div style={gridStyle}>
          {spacingTokenOrder.map((token) => {
            const value = spacingTokensDefinition[token];
            return (
              <TokenCard
                key={token}
                name={token}
                value={`${value.px}px · ${value.rem}`}
                preview={
                  <div
                    style={{
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: value.rem === "0" ? 2 : value.rem,
                        height: spacingTokensDefinition.S.rem,
                        background: colorTokensDefinition.Inverse,
                        borderRadius: spacingTokensDefinition["3XS"].rem,
                        minWidth: 2,
                      }}
                    />
                  </div>
                }
              />
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export function TypographyTokensView() {
  return (
    <div style={pageStyle}>
      <Section title="Typography (Figma)">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(typographyTokensDefinition).map(([name, value]) => (
            <div key={name} style={cardStyle}>
              <span
                style={{
                  fontSize: value.fontSize,
                  lineHeight: value.lineHeight,
                  fontFamily: value.fontFamily,
                }}
              >
                The quick brown fox — {name}
              </span>
              <div style={metaStyle}>
                <span style={nameStyle}>{name}</span>
                <code>
                  {value.fontSize} / {value.lineHeight} / {value.fontFamily}
                </code>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function flattenColors(
  obj: Record<string, unknown>,
  prefix = "",
): Array<{ name: string; value: string }> {
  const entries: Array<{ name: string; value: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      entries.push({ name: path, value });
    } else if (value && typeof value === "object") {
      entries.push(...flattenColors(value as Record<string, unknown>, path));
    }
  }

  return entries;
}

export function SemanticTokensView() {
  const entries = flattenColors(
    semantic.color as unknown as Record<string, unknown>,
  );

  return (
    <div style={pageStyle}>
      <Section title="Semantic (aliases → Figma)">
        <div style={gridStyle}>
          {entries.map((token) => (
            <TokenCard
              key={token.name}
              name={token.name}
              value={token.value}
              preview={<ColorSwatch value={token.value} />}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function ComponentTokensView() {
  return (
    <div style={pageStyle}>
      <Section title="Component — Button">
        <div style={gridStyle}>
          {Object.entries(component.button.variant).map(([key, value]) => (
            <TokenCard
              key={key}
              name={`button.variant.${key}`}
              value={`${value.background} / ${value.foreground}`}
              preview={
                <div
                  style={{
                    height: 64,
                    borderRadius: component.button.radius,
                    background: value.background,
                    color: value.foreground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: component.button.fontFamily,
                    fontSize:
                      component.button.size.medium.typography.fontSize,
                  }}
                >
                  Aa
                </div>
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Component — Badge">
        <div style={gridStyle}>
          {Object.entries(component.badge.variant).map(([key, value]) => (
            <TokenCard
              key={key}
              name={`badge.variant.${key}`}
              value={`${value.background} / ${value.foreground}`}
              preview={
                <div
                  style={{
                    height: component.badge.desktop.height,
                    padding: `${component.badge.desktop.paddingY} ${component.badge.desktop.paddingX}`,
                    borderRadius: component.badge.desktop.radius,
                    background: value.background,
                    color: value.foreground,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: component.badge.typography.fontSize,
                    fontFamily: component.badge.typography.fontFamily,
                    fontWeight: component.badge.fontWeight,
                    lineHeight: component.badge.typography.lineHeight,
                  }}
                >
                  Badge
                </div>
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Component — Tabs (placeholder)">
        <div style={gridStyle}>
          <TokenCard
            name="tabs.tab.color"
            value={component.tabs.tab.color}
            preview={<ColorSwatch value={component.tabs.tab.color} />}
          />
          <TokenCard
            name="tabs.tab.colorSelected"
            value={component.tabs.tab.colorSelected}
            preview={<ColorSwatch value={component.tabs.tab.colorSelected} />}
          />
          <TokenCard
            name="tabs.tab.indicatorColor"
            value={component.tabs.tab.indicatorColor}
            preview={<ColorSwatch value={component.tabs.tab.indicatorColor} />}
          />
          <TokenCard
            name="tabs.listBorderColor"
            value={component.tabs.listBorderColor}
            preview={<ColorSwatch value={component.tabs.listBorderColor} />}
          />
        </div>
      </Section>
    </div>
  );
}
