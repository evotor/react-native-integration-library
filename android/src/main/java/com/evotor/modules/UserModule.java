package com.evotor.modules;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.evotor.utilities.Writer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ru.evotor.framework.users.Grant;
import ru.evotor.framework.users.User;
import ru.evotor.framework.users.UserApi;

/**
 * Created by a.lunkov on 24.10.2017.
 */

public class UserModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    public UserModule(ReactApplicationContext c) {
        super(c);
        context = c;
    }

    @Override
    public String getName() {
        return "UserModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void getAllUsers(Callback callback) {
        List<User> users = UserApi.getAllUsers(context);
        callback.invoke(users == null ? null : Writer.INSTANCE.writeUsers(users));
    }

    @ReactMethod
    public void getAuthenticatedUser(Callback callback) {
        User user = UserApi.getAuthenticatedUser(context);
        callback.invoke(user == null ? null : Writer.INSTANCE.writeUser(user));
    }

    @ReactMethod
    public void getAllGrants(Callback callback) {
        List<Grant> grants = UserApi.getAllGrants(context);
        callback.invoke(grants == null ? null : Writer.INSTANCE.writeGrants(grants));
    }

    @ReactMethod
    public void getGrantsOfAuthenticatedUser(Callback callback) {
        List<Grant> grants  = UserApi.getGrantsOfAuthenticatedUser(context);
        callback.invoke(grants == null ? null : Writer.INSTANCE.writeGrants(grants));
    }

}
