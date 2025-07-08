// Simple dataService without Google Sheets - Clean and Simple!
import googleSheetsData from "../data/googleSheets.json"
import websiteLinksData from "../data/websiteLinks.json"
import tasksData from "../data/tasks.json"

// In-memory storage - Simple and Fast!
const currentData = {
  excelSheets: [...googleSheetsData],
  websiteLinks: [...websiteLinksData],
  tasks: [...tasksData],
}

// Helper function to generate unique IDs
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const dataService = {
  // Excel Sheets - Simple and Clean!
  getExcelSheets: async () => {
    return [...currentData.excelSheets]
  },

  createExcelSheet: async (data) => {
    const newSheet = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    currentData.excelSheets = [newSheet, ...currentData.excelSheets]
    return newSheet
  },

  updateExcelSheet: async (id, data) => {
    const index = currentData.excelSheets.findIndex((s) => s.id === id)
    if (index !== -1) {
      const updatedSheet = {
        ...currentData.excelSheets[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      currentData.excelSheets[index] = updatedSheet
      return updatedSheet
    }
    throw new Error("Sheet not found")
  },

  deleteExcelSheet: async (id) => {
    currentData.excelSheets = currentData.excelSheets.filter((s) => s.id !== id)
    return { message: "Sheet deleted successfully" }
  },

  // Website Links - Simple and Clean!
  getWebsiteLinks: async () => {
    return [...currentData.websiteLinks]
  },

  createWebsiteLink: async (data) => {
    const newLink = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    currentData.websiteLinks = [newLink, ...currentData.websiteLinks]
    return newLink
  },

  updateWebsiteLink: async (id, data) => {
    const index = currentData.websiteLinks.findIndex((l) => l.id === id)
    if (index !== -1) {
      const updatedLink = {
        ...currentData.websiteLinks[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      currentData.websiteLinks[index] = updatedLink
      return updatedLink
    }
    throw new Error("Link not found")
  },

  deleteWebsiteLink: async (id) => {
    currentData.websiteLinks = currentData.websiteLinks.filter((l) => l.id !== id)
    return { message: "Link deleted successfully" }
  },

  // Tasks - Simple and Clean!
  getTasks: async () => {
    return [...currentData.tasks]
  },

  createTask: async (data) => {
    const newTask = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    currentData.tasks = [newTask, ...currentData.tasks]
    return newTask
  },

  updateTask: async (id, data) => {
    const index = currentData.tasks.findIndex((t) => t.id === id)
    if (index !== -1) {
      const updatedTask = {
        ...currentData.tasks[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      currentData.tasks[index] = updatedTask
      return updatedTask
    }
    throw new Error("Task not found")
  },

  deleteTask: async (id) => {
    currentData.tasks = currentData.tasks.filter((t) => t.id !== id)
    return { message: "Task deleted successfully" }
  },

  // Simple data access for any future needs
  getAllData: () => {
    return {
      excelSheets: [...currentData.excelSheets],
      websiteLinks: [...currentData.websiteLinks],
      tasks: [...currentData.tasks],
    }
  },

  updateAllData: async (newData) => {
    if (newData.excelSheets) {
      currentData.excelSheets = [...newData.excelSheets]
    }
    if (newData.websiteLinks) {
      currentData.websiteLinks = [...newData.websiteLinks]
    }
    if (newData.tasks) {
      currentData.tasks = [...newData.tasks]
    }
  },
}
