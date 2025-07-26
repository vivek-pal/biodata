import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = ({ 
  isProcessing, 
  processingStage, 
  estimatedTime, 
  onStartProcessing, 
  onViewResults, 
  hasFiles,
  processingComplete 
}) => {
  const processingStages = [
    { id: 'upload', label: 'File Upload', icon: 'Upload' },
    { id: 'validation', label: 'Document Validation', icon: 'CheckCircle' },
    { id: 'extraction', label: 'Data Extraction', icon: 'FileText' },
    { id: 'analysis', label: 'AI Analysis', icon: 'Brain' },
    { id: 'matching', label: 'Profile Matching', icon: 'Users' },
    { id: 'complete', label: 'Processing Complete', icon: 'CheckCircle2' }
  ];

  const getCurrentStageIndex = () => {
    return processingStages.findIndex(stage => stage.id === processingStage);
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!isProcessing && !processingComplete) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Brain" size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready for AI Processing
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your bio data documents and start to find the best matches.
            </p>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={onStartProcessing}
            disabled={!hasFiles}
            iconName="Play"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            {hasFiles ? 'Start AI Processing' : 'Upload Files First'}
          </Button>
          {hasFiles && (
            <p className="text-xs text-muted-foreground">
              Estimated processing time: 2-5 minutes
            </p>
          )}
        </div>
      </div>
    );
  }

  if (processingComplete) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle2" size={32} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Processing Complete!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your bio data has been successfully analyzed. View your results and potential matches.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              onClick={onViewResults}
              iconName="Eye"
              iconPosition="left"
            >
              View Results
            </Button>
            <Button
              variant="outline"
              onClick={onStartProcessing}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Process Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Loader2" size={32} className="text-primary animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Processing Your Bio Data
          </h3>
          <p className="text-sm text-muted-foreground">
            Our AI is analyzing your profile for the best matches
          </p>
          {estimatedTime && (
            <p className="text-xs text-muted-foreground mt-2">
              Estimated time remaining: {formatTime(estimatedTime)}
            </p>
          )}
        </div>

        {/* Processing Steps */}
        <div className="space-y-3">
          {processingStages.map((stage, index) => {
            const currentIndex = getCurrentStageIndex();
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;

            return (
              <div
                key={stage.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isCompleted
                    ? 'bg-success/5 border border-success/20'
                    : isCurrent
                    ? 'bg-primary/5 border border-primary/20' :'bg-muted/30 border border-transparent'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-success text-white'
                      : isCurrent
                      ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : isCurrent ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name={stage.icon} size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stage.label}
                  </p>
                </div>
                {isCompleted && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">
              {Math.round(((getCurrentStageIndex() + 1) / processingStages.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((getCurrentStageIndex() + 1) / processingStages.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;