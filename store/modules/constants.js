const state = {
  event: {
	  classify: {
		  INPUT: "INPUT",
		  OUTPUT: "OUTPUT",
		  PA: "PHYSICAL_AGILITY"
	  },
	  type: {
		  GENERIC: "GENERIC",
		  EVERYDAY: "EVERYDAY",
		  WEEKLY: "WEEKLY",
		  MONTHLY: "MONTHLY"
	  }
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}