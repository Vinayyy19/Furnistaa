import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart");
      return res.data.cart?.items || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart/add", {
        productId,
        variantId,
        quantity,
      });
      return res.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update cart quantity
export const updateCartQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.patch("/cart/update", {
        productId,
        variantId,
        quantity,
      });
      return res.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Remove item
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/cart/remove/${productId}/${variantId}`);
      return res.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.initialized = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
        state.initialized = true;
      })
      .addCase(fetchCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.initialized = true;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateCartQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQty.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(updateCartQty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(removeCartItem.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectCartPricing = (state) => {
  const items = state.cart.items;

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * (item.variant?.sellingPrice || 0),
    0
  );

  const shippingFee = items.length > 0 ? 49 : 0;

  const totalPayable = subtotal + shippingFee;

  return {
    items,
    subtotal,
    shippingFee,
    totalPayable,
  };
};

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
