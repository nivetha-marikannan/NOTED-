import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const index = tasks.findIndex(task => 
      task.title.toLowerCase() === searchTerm.toLowerCase()
    );
    if (index !== -1) {
      handleEditTask(index);
    }
  }, [searchTerm]);

  const handleAddTask = () => {
    if (title && task) {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { title, text: task };
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, { title, text: task }]);
      }
      setTitle("");
      setTask("");
    }
  }

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setTask(taskToEdit.text);
    setEditIndex(index);
  }

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    if (editIndex === index) {
      setTitle("");
      setTask("");
      setEditIndex(-1);
    }
  }

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.taskBox}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskNumber}>{index + 1}</Text>
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      <Text style={styles.taskText}>
        {item.text}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri:"C:\Users\NivethaMarikannan\Desktop\image.jpg" }} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>NOTED</Text>
        <Text style={styles.title}>TAKE A NOTE</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter Content'
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>
            {editIndex !== -1 ? "Update Task" : "Add a new NOTE"}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder='Search by Title'
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)' // Slightly transparent background for content
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "dodgerblue"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18
  },
  searchInput: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  taskBox: {
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: '#ffffff', // White background for the task box
    shadowColor: '#000', // Shadow for a 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  taskNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'dodgerblue'
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'dodgerblue'
  },
  taskText: {
    fontSize: 19,
    color: '#333'
  },
  taskActions: {
    flexDirection: "row",
    marginTop: 10
  },
  editButton: {
    color: "dodgerblue",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18
  }
});
