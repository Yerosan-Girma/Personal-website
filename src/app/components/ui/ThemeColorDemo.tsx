import { useColorUtils } from "../../hooks/useColorUtils";

/**
 * Demo component showcasing theme-aware color transitions and hover effects
 * Implements Requirements 2.3, 2.7, 2.10
 */
export function ThemeColorDemo() {
  const { getThemedHoverColor, getSecondaryColor } = useColorUtils();

  // Example colors
  const accentColor = "#6366F1";
  const accentHover = getThemedHoverColor(accentColor);
  const secondaryColor = getSecondaryColor(accentColor);

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Color Transitions Demo</h3>
        
        {/* Primary accent button with hover */}
        <button
          className="px-6 py-3 rounded-lg font-semibold hover-transition"
          style={{
            backgroundColor: accentColor,
            color: "#FFFFFF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accentHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = accentColor;
          }}
        >
          Hover Me (10% Luminosity Shift)
        </button>

        {/* Secondary background with opacity */}
        <div
          className="p-6 rounded-lg theme-transition"
          style={{ backgroundColor: secondaryColor }}
        >
          <p className="font-medium">
            Secondary Color Background (10% Opacity)
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This uses the accent color with 10% opacity as per Requirement 2.7
          </p>
        </div>

        {/* Card with CSS variable hover */}
        <div className="p-6 rounded-lg bg-card border border-border hover:bg-card-hover color-transition cursor-pointer">
          <p className="font-medium">
            Card with CSS Variable Hover
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Uses --card and --card-hover CSS variables with 300ms transition
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Color Values</h4>
        <div className="text-sm space-y-1 font-mono">
          <p>Base Accent: {accentColor}</p>
          <p>Hover Color: {accentHover}</p>
          <p>Secondary Color: {secondaryColor}</p>
        </div>
      </div>
    </div>
  );
}
