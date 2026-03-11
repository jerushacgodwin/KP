<?php
/**
 * KP APPLICATION - DIAGNOSTIC HEARTBEAT (v61)
 */
header('Content-Type: text/html');
?>
<html>
    <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #e0f2fe;">
        <div style="text-align: center; padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <h1 style="color: #0369a1;">💙 LiteSpeed / PHP is ALIVE</h1>
            <p style="font-size: 1.2rem;">If you are seeing this page, then your domain is correctly connected.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
            <p style="color: #ef4444; font-weight: bold;">⚠️ PROBLEM DETECTED:</p>
            <p>Node.js did <b>NOT</b> take over this request.</p>
            <p style="color: #64748b; font-size: 0.9rem;">[v61 Structural Diagnostic]</p>
        </div>
    </body>
</html>
