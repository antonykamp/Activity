import { Checkbox, Container, Heading, List, ListItem } from "@chakra-ui/react"

export default function Demo() {
  return (
    <Container>
      <Heading size="xl">Frittata Recipe</Heading>

      <Heading size="md">Ingredients</Heading>
      <List>
        <ListItem>
          <Checkbox>Three Eggs</Checkbox>
        </ListItem>
        <ListItem>
          <Checkbox>1 Chicken</Checkbox>
        </ListItem>
      </List>

      <Heading size="md">Method</Heading>

      <List>
        <ListItem>
          <Checkbox>Stirr Eggs</Checkbox>
        </ListItem>
        <ListItem>
          <Checkbox>Make Chicken eat Frittata</Checkbox>
        </ListItem>
      </List>
    </Container>
  )
}
