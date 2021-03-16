import { Checkbox, Container, Heading, List, ListItem } from "@chakra-ui/react"

const ingridients = ["three Eggs", "1 Chicken", "Vegetables"]
const methods = ["Stirr Eggs", "kill Chicken", "eat Chicken"]

export default function Demo() {
  return (
    <Container>
      <Heading size="xl">Frittata Recipe</Heading>

      <Heading size="md">Ingredients</Heading>
      <List>
        {ingridients.map((el) => {
          return (
            <ListItem>
              <Checkbox>{el}</Checkbox>
            </ListItem>
          )
        })}
      </List>

      <Heading size="md">Method</Heading>

      <List>
        {methods.map((method) => {
          return (
            <ListItem>
              <Checkbox>{method}</Checkbox>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}
