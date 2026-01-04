import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

// Fetch cart on app load / refresh
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const res = await fetch(`${API_BASE}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      return data.cart?.items || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Add item
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, variantId, quantity }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      const data = await res.json();
      return data.cart.items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update quantity
export const updateCartQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/cart/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, variantId, quantity }),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      return data.cart.items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Remove item
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE}/cart/remove/${productId}/${variantId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Remove failed");

      const data = await res.json();
      return data.cart.items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// create slice
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
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.initialized = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      })

      /* Add */
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Update */
      .addCase(updateCartQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Remove */
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// cart Pricing
export const selectCartPricing = (state) => {
  const items = state.cart.items;

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.variant.sellingPrice,
    0
  );

  const protectFee = items.length > 0 ? 49 : 0;

  const totalMRP = items.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (item.variant.mrp || item.variant.sellingPrice),
    0
  );

  const totalPayable = subtotal + protectFee;
  const savings = Math.max(totalMRP - totalPayable, 0);

  return {
    items,
    subtotal,
    protectFee,
    totalPayable,
    savings,
  };
};

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
