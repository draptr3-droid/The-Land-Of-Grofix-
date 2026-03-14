// story.js — Story engine helpers
// Story rendering is handled by UI.renderScene() in ui.js
// This file holds story utility functions

const StoryEngine = {
  getAvailableChoices(nodeId) {
    const node = DATA.story[nodeId];
    if (!node) return [];
    return (node.choices || []).filter(c => {
      if (c.req?.flag && !Engine.hasFlag(c.req.flag)) return false;
      return true;
    });
  },
  getStoryProgress() {
    return {
      path: Engine.state.storyPath,
      flags: Object.keys(Engine.state.storyFlags),
      visited: Engine.state.visitedNodes.length,
      faction: Engine.state.faction
    };
  }
};
