"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);

    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });

    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();

      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box
      width="100vw"
      display="flex"
      marginTop={4}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: "translate(-50%,-50%)" }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            ></TextField>
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Stack width="1000px" spacing={2} direction="row" marginBottom={2}>
        <Button
          sx={{ width: "50px" }}
          variant="outlined"
          onClick={() => handleOpen()}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://cdn0.iconfinder.com/data/icons/cooking-61/64/Recipe_cooking_book_kitchen_menu_-512.png"
          />
        </Button>

        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1 }}
          margin="normal"
        />

        <Button
          sx={{ width: "150px" }}
          variant="contained"
          onClick={() => handleOpen()}
        >
          Add New Item
        </Button>

        <Button
          sx={{ width: "50px" }}
          variant="outlined"
          onClick={() => handleOpen()}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://icon-library.com/images/photography-icon-png/photography-icon-png-7.jpg"
          />
        </Button>
      </Stack>

      <Grid width="800px" container spacing={2}>
        {filteredInventory.map(({ name, quantity }) => (
          <Grid
            key={name}
            item
            xs={6}
            md={3}
            m={4}
            p={1}
            sx={{ border: "1px solid black", borderRadius: "10px" }}
          >
            <Stack direction="column" spacing={2}>
              <Typography variant="h6" textAlign="center" color="#333">
                <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => addItem(name)}>
                  <Typography textAlign="center">+</Typography>
                </Button>
                <Typography variant="h6" textAlign="center" color="#333">
                  {quantity}
                </Typography>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  <Typography textAlign="center">-</Typography>
                </Button>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
