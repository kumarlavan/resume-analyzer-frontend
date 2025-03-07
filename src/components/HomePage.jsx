import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Typography, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const response = await axios.post( "https://resume-analyzer-two.vercel.app/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
          withCredentials: true, // Include credentials if needed
        });
      setScore(response.data.score);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Data for the speedometer
  const gaugeData = [
    { name: "Score", value: score || 0, color: "#4CAF50" }, // Green for the score
    { name: "Remaining", value: 100 - (score || 0), color: "#E0E0E0" }, // Gray for the remaining
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 max-w-2xl w-full text-center shadow-lg">
          <Typography variant="h4" className="mb-6 font-bold text-gray-800">
            Resume ATS Analyzer
          </Typography>

          {/* File Upload Section */}
          <div className="mb-6">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Upload Resume
                </Button>
              </motion.div>
            </label>
            {file && (
              <Typography variant="body1" className="mt-2 text-gray-700">
                Selected File: {file.name}
              </Typography>
            )}
          </div>

          {/* Review Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!file || loading}
              className="bg-green-500 hover:bg-green-600"
            >
              {loading ? <CircularProgress size={24} className="text-white" /> : "Review Resume"}
            </Button>
          </motion.div>

          {/* ATS Score Display */}
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Typography variant="h5" className="mb-4 text-gray-800">
                ATS Score: {score}/100
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={180}
                    endAngle={0}
                    dataKey="value"
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Suggestions Display */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-left"
            >
              <Typography variant="h5" className="mb-4 text-gray-800">
                Suggestions for Improvement
              </Typography>
              <ul className="list-disc list-inside">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="mb-2 text-gray-700">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default HomePage;