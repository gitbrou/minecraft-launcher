package com.minelauncher.app;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "PojavBridge")
public class PojavBridgePlugin extends Plugin {

    private static final String POJAV_PKG = "net.kdt.pojavlaunch";

    @PluginMethod
    public void launch(PluginCall call) {
        String version = call.getString("version", "");
        PackageManager pm = getContext().getPackageManager();
        try {
            pm.getPackageInfo(POJAV_PKG, 0);
            Intent i = new Intent();
            i.setClassName(POJAV_PKG, "net.kdt.pojavlaunch.LauncherActivity");
            i.putExtra("po-jav-launch-version", version);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
            call.resolve(new JSObject().put("ok", true));
        } catch (PackageManager.NameNotFoundException e) {
            Intent i = new Intent(Intent.ACTION_VIEW,
                    Uri.parse("market://details?id=" + POJAV_PKG));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
            call.resolve(new JSObject().put("ok", false).put("reason", "not_installed"));
        }
    }
}
