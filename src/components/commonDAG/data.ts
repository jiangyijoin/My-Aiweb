export const data = {
  connections: [
    {
      sourceId: "0",
      targetId: "1",
    },
    {
      sourceId: "1",
      targetId: "2",
    },
    {
      sourceId: "2",
      targetId: "3",
    },
    {
      sourceId: "2",
      targetId: "3.5",
      targetPort: 2,
    },
    {
      sourceId: "3",
      targetId: "4",
    },
    {
      sourceId: "3.5",
      sourcePort: 2,
      targetId: "4",
    },
    {
      sourceId: "4",
      targetId: "5",
    },
  ],
  nodes: [
    {
      config: {
        label: "Node Default",
        type: "source",
      },
      id: "0",
    },
    {
      config: {
        label: "NodeLink",
        type: "link",
        state: "success",
        icon: "database"
      },
      id: "1",
    },
    {
      config: {
        label: "Node1to2",
        type: "N1to2",
        state: "success",
        icon: "setting"
      },
      id: "2",
    },
    {
      config: {
        label: "Node1to1",
        type: "N1to1",
        state: "loading",
        icon: "setting"
      },
      id: "3",
    },
    {
      config: {
        label: "Node1to1(R)",
        type: "N1to1",
        state: "error",
        icon: "setting"
      },
      id: "3.5",
    },
    {
      config: {
        label: "Node2to1",
        type: "N2to1",
      },
      id: "4",
    },
    {
      config: {
        label: "output",
        type: "target",
      },
      id: "5",
    },
  ],
};
