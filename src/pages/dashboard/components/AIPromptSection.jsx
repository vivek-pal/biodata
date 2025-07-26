import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const AIPromptSection = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock AI response data
  const aiResponse = {
    analysis: `Based on your bio data and preferences, I've identified several key compatibility factors:\n\n• **Education Compatibility**: Your graduate background aligns well with 89% of potential matches\n• **Location Preferences**: Mumbai and Bangalore show the highest match density (156 profiles)\n• **Professional Alignment**: IT professionals show 94% compatibility in lifestyle preferences\n• **Age Range Optimization**: Consider expanding to 24-36 years for 23% more matches`,
    confidence: 94,
    suggestions: [
      "Expand age range by 1 year on both sides",
      "Consider profiles from Pune and Hyderabad",
      "Include 'Any Graduate' in education criteria",
    ],
    matchCount: 247,
    timestamp: new Date().toISOString(),
  };

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              AI Analysis
            </h2>
            <p className="text-sm text-muted-foreground">
              Get intelligent matching insights
            </p>
          </div>
        </div>

        {/* Mobile collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
        </Button>
      </div>

      {/* Content */}
      <div
        className={`${
          isCollapsed ? "hidden" : "block"
        } lg:block p-4 pt-0 lg:pt-4`}
      >
        {/* Prompt Input */}
        <div className="space-y-3 mb-4">
          <Input
            label="Ask AI about your profile"
            type="text"
            placeholder="Please enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
          />

          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={handlePromptSubmit}
              loading={isProcessing}
              disabled={!prompt.trim() || isProcessing}
              iconName="Send"
              iconPosition="right"
              className="flex-1"
            >
              {isProcessing ? "Analyzing..." : "Enter"}
            </Button>
          </div>
        </div>

        {/* AI Response Results */}
        {showResults && (
          <div className="space-y-4">
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    AI Analysis Results
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    {aiResponse.confidence}% Confidence
                  </span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-foreground whitespace-pre-line mb-3">
                  {aiResponse.analysis}
                </p>
              </div>

              {/* Key Suggestions */}
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-foreground">
                  Key Suggestions:
                </p>
                {aiResponse.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon
                      name="ArrowRight"
                      size={14}
                      className="text-accent mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground">
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent AI Interactions */}
        {!showResults && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">
                Recent AI Interactions
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/history-results")}
                iconName="ArrowRight"
                iconPosition="right"
              >
                View All
              </Button>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      Profile compatibility analysis
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2 hours ago • 96% confidence
                    </p>
                  </div>
                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="text-muted-foreground mt-1"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      Preference optimization suggestions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      1 day ago • 89% confidence
                    </p>
                  </div>
                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="text-muted-foreground mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPromptSection;
