import GroupService from '../services/groupService.js';

export const getGroups = async (req, res) => {
  try {
    const groups = await GroupService.getGroups(req.user.id);
    res.status(200).json(groups);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const group = await GroupService.createGroup(req.user.id, req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const group = await GroupService.updateGroup({
      groupId: req.params.id,
      userId: req.user.id,
      name: req.body.name,
      description: req.body.description,
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const group = await GroupService.deleteGroup({ groupId: req.params.id, userId: req.user.id });
    res.status(200).json(group);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export const inviteMember = async (req, res) => {
  try {
    const group = await GroupService.inviteMember({ groupId: req.params.id, userId: req.user.id, username: req.params.userName });
    res.status(200).json(group);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const group = await GroupService.removeMember({ groupId: req.params.id, userId: req.user.id, userIdToRemove: req.params.userId });
    res.status(200).json(group);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};
