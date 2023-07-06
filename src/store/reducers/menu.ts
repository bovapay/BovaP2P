import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project import
import axios from 'utils/axios';

// types
import { MenuProps } from 'types/menu';

// initial state
const initialState: MenuProps = {
  openItem: [],
  openComponent: 'buttons',
  selectedID: null,
  drawerOpen: false,
  componentDrawerOpen: true,
  error: null,
  menu: {
    id: 'group-navigation',
    title: 'sections',
    type: 'group',
    icon: 'home',
    children: [
      {
        id: 'main',
        title: 'main',
        type: 'item',
        url: '/',
        icon: 'home',
        target: false
      },
      {
        id: 'transactions',
        title: 'transactions',
        type: 'item',
        url: '/transactions',
        icon: 'transactions',
        target: false
      },
      {
        id: 'disputes',
        title: 'disputes',
        type: 'item',
        url: '/disputes',
        icon: 'disputes',
        target: false
      },
      {
        id: 'payOut',
        title: 'payouts',
        type: 'item',
        url: '/payOut',
        icon: 'payOut',
        target: false
      },
      {
        id: 'massPayOut',
        title: 'massPayouts',
        type: 'item',
        url: '/massPayOut',
        icon: 'massPayOut',
        target: false
      }
    ]
  }
  //   id: 'group-dashboard',
  //   title: 'dashboard',
  //   type: 'group',
  //   icon: 'dashboard',
  //   children: [
  //     {
  //       id: 'dashboard',
  //       title: 'dashboard',
  //       type: 'collapse',
  //       icon: 'dashboard',
  //       children: [
  //         {
  //           id: 'default',
  //           title: 'default',
  //           type: 'item',
  //           url: '/',
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'analytics',
  //           title: 'analytics',
  //           type: 'item',
  //           url: '/analytics',
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'components',
  //       title: 'components',
  //       type: 'item',
  //       url: '/components-overview/buttons',
  //       icon: 'components',
  //       target: true,
  //       chip: {
  //         label: 'new',
  //         color: 'primary',
  //         size: 'small',
  //         variant: 'combined'
  //       }
  //     }
  //   ]
  // }
};

// ==============================|| SLICE - MENU ||============================== //

// export const fetchMenu = createAsyncThunk('', async () => {
//   const response = await axios.get('/api/menu/dashboard');
//   return response.data;
// });

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    hasError(state, action) {
      state.error = action.payload;
    }
  }

  // extraReducers(builder) {
  //   builder.addCase(fetchMenu.fulfilled, (state, action) => {
  //     state.menu = action.payload.dashboard;
  //   });
  // }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, activeID } = menu.actions;
