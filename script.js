{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (function() \{\
    // Runs after the page loads\
    document.addEventListener('DOMContentLoaded', function() \{\
        document.getElementById('calculateBtn')\
                .addEventListener('click', calculateResults);\
    \});\
\
    function calculateResults() \{\
        // Get input values\
        var ppm = parseFloat(document.getElementById('targetPpm').value);\
        var percentActive = parseFloat(document.getElementById('percentActive').value);\
        var volumeGal = parseFloat(document.getElementById('treatedVolumeGal').value);\
        var specGrav = parseFloat(document.getElementById('specificGravity').value);\
\
        // Reference to results div\
        var resultsDiv = document.getElementById('results');\
        \
        // Basic validation\
        if (\
            isNaN(ppm) || ppm <= 0 ||\
            isNaN(percentActive) || percentActive <= 0 || percentActive > 100 ||\
            isNaN(volumeGal) || volumeGal <= 0 ||\
            isNaN(specGrav) || specGrav <= 0\
        ) \{\
            resultsDiv.textContent = "Please enter valid positive numbers (and % Active <= 100).";\
            return;\
        \}\
\
        // 1) Calculate total mg of active needed\
        //    1 ppm ~ 1 mg per liter of water\
        //    1 US gallon ~ 3.785411784 liters\
        var mgActiveNeeded = ppm * volumeGal * 3.785411784;\
\
        // 2) Convert mg active -> lbs active\
        //    1 lb = 453592.37 mg\
        var lbsActiveNeeded = mgActiveNeeded / 453592.37;\
\
        // 3) % Active => fraction\
        var fractionActive = percentActive / 100;\
        //    Total solution in lbs\
        var lbsSolution = lbsActiveNeeded / fractionActive;\
\
        // 4) Volume of solution in gallons\
        //    Water ~8.34 lb/gal, solution ~8.34 * specGrav lb/gal\
        var volumeSolutionGal = lbsSolution / (8.34 * specGrav);\
\
        // 5) Convert gallons to fl oz (1 gal = 128 fl oz)\
        var volumeSolutionFlOz = volumeSolutionGal * 128;\
\
        // Round results for display\
        var volOzRounded = volumeSolutionFlOz.toFixed(2);\
        var wtSolRounded = lbsSolution.toFixed(3);\
        var wtActiveRounded = lbsActiveNeeded.toFixed(3);\
\
        // Display them\
        resultsDiv.innerHTML = \
            "Volume of Solution (fl oz): " + volOzRounded + "<br/>" +\
            "Weight of Solution (lbs): " + wtSolRounded + "<br/>" +\
            "Weight of Active Chemical (lbs): " + wtActiveRounded;\
    \}\
\})();}