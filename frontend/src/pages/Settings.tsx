"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getThresholdSettings, updateThresholdSettings } from "@/services/api";

export default function Settings() {
  const [threshold, setThreshold] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const DEVICE_ID = "flow_sensor0";

  useEffect(() => {
    getThresholdSettings(DEVICE_ID).then((res) => {
      if (res) {
        setThreshold(res.threshold_value);
        setDuration(res.threshold_duration);
      }
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    const result = await updateThresholdSettings(DEVICE_ID, threshold, duration);
    if (result) {
      toast.success("Threshold settings updated successfully");
    }
    else {
      toast.error("Failed to update settings");
    }
  };

  return (
    <div className="max-w-lg mx-auto -mt-24">
      <Card className="z-999 relative">
        <CardHeader>
          <CardTitle>Leak Detection Threshold</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="threshold">Flow Rate Threshold (L/min)</Label>
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={e => setThreshold(Number(e.target.value))}
              min={1}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="duration">Duration Threshold (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              min={1}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
