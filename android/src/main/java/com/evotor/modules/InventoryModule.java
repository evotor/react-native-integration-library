package com.evotor.modules;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.evotor.converter.Writer;

import java.util.HashMap;
import java.util.Map;

import ru.evotor.framework.inventory.InventoryApi;
import ru.evotor.framework.inventory.ProductItem;
import ru.evotor.framework.inventory.field.Field;

/**
 * Created by a.lunkov on 25.10.2017.
 */

public class InventoryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext context;

    public InventoryModule(ReactApplicationContext c) {
        super(c);
        context = c;
    }

    @Override
    public String getName() {
        return "InventoryModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        return new HashMap<>();
    }

    @ReactMethod
    public void getAllBarcodesForProduct(String productUuid, Callback getter) {
        getter.invoke(Writer.INSTANCE.writeBarcodes(
                InventoryApi.getAllBarcodesForProduct(context, productUuid)
        ));
    }

    @ReactMethod
    public void getProductByUuid(String uuid, Callback getter) {
        ProductItem productItem = InventoryApi.getProductByUuid(context, uuid);
        getter.invoke(productItem == null ? null : Writer.INSTANCE.writeProductItem(productItem));
    }

    @ReactMethod
    public void getField(String fieldUuid, Callback getter) {
        Field field = InventoryApi.getField(context, fieldUuid);
        getter.invoke(field == null ? null : Writer.INSTANCE.writeField(field));
    }

    @ReactMethod
    public void getProductExtras(String productUuid, Callback getter) {
        getter.invoke(Writer.INSTANCE.writeProductExtras(
                InventoryApi.getProductExtras(context, productUuid)
        ));
    }

}
