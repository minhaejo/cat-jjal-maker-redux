import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 catList :[],
 catCount:1
}
//여기서 관리해야 하는 상태 목록
//페이버릿 베열 (빈배열 초기화)
//카운트 
//하트 누르고 토글 배열에서 뺐다 넣었다 
//그리고 메인이미지를 이니셜 스테이트에 넣고 fetch로 새로운 이미지를 계속 받아와야하는데 그것도 fetch를 여기서 해야겠네

const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
      saveFavoriteCat:(state,action)=>{
          state.catList.push(action.payload)
          console.log(state.catList)
      },
      saveTitleCount:(state,action)=>{
        console.log(action.payload)
       let stateCount = action.payload + 1
       state.catCount = stateCount
      }
  }
});

export const {saveFavoriteCat,saveTitleCount} = catSlice.actions
export const selectCat = state => state.cats.catList
console.log(selectCat)

export default catSlice.reducer