package com.lambda.medkit;

import android.os.Bundle;
import android.content.res.Configuration;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  void syncDarkMode() {
    // Android "fix" for enabling dark mode
    // @see: https://github.com/ionic-team/capacitor/discussions/1978
    int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
    WebSettings webSettings = this.bridge.getWebView().getSettings();

    String darkMode = " AndroidDarkMode";
    if (nightModeFlags == Configuration.UI_MODE_NIGHT_YES) {
      String userAgent = webSettings.getUserAgentString();
      if (!userAgent.contains(darkMode)) {
        userAgent = userAgent + darkMode;
        webSettings.setUserAgentString(userAgent);
      }
    } else {
      String userAgent = webSettings.getUserAgentString();
      if (userAgent.contains(darkMode)) {
        userAgent = userAgent.replace(darkMode, "");
        webSettings.setUserAgentString(userAgent);
      }
    }
  }

  @Override
  public void onStart() {
    super.onStart();
    syncDarkMode();
  }

  @Override
  public void onResume() {
    super.onResume();
    syncDarkMode();
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});
  }
}