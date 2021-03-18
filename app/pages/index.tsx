import { Suspense } from "react"
import { Link, BlitzPage, useMutation, useQuery, Router } from "blitz"
import getNotificationsOfUser from "app/queries/getNotificationsOfUser"
import addNewCircle from "app/mutations/addNewCircle"
import Layout from "app/core/layouts/Layout"
import { ArrowRightIcon, AddIcon, HamburgerIcon, EmailIcon } from "@chakra-ui/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import {
  Grid,
  Heading,
  Circle,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuIcon,
  GridItem,
  Tag,
  TagLabel,
  TagRightIcon,
  Box,
  Button,
  Center,
  Container,
  List,
  IconButton,
  chakra,
  Text,
} from "@chakra-ui/react"
import getCirclesOfUser from "app/queries/getCirclesOfUser"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Navbar = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        size="lg"
        variant="outline"
      />
      <MenuList>
        <MenuItem>
          <UserInfo />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Center>
          <Button
            onClick={async () => {
              await logoutMutation()
            }}
          >
            <a className="button small">
              <strong>Logout</strong>
            </a>
          </Button>
          <div>
            User id: <code>{currentUser.id}</code>
            <br />
            User role: <code>{currentUser.role}</code>
          </div>
        </Center>
      </>
    )
  } else {
    return (
      <>
        <Center>
          <Link href="/signup">
            <Button>
              <a className="button small">
                <strong>Sign Up</strong>
              </a>
            </Button>
          </Link>
          <Link href="/login">
            <Button>
              {" "}
              <a className="button small">
                <strong>Login</strong>
              </a>
            </Button>
          </Link>
        </Center>
      </>
    )
  }
}

const Home = () => {
  const currentUser = useCurrentUser()
  const [userNotifications] = useQuery(getNotificationsOfUser, null)
  const [userCircles, searchExtras] = useQuery(getCirclesOfUser, null)
  const [addCircle] = useMutation(addNewCircle)
  const notificationCount = userNotifications.length

  async function addCircleOnClick(event) {
    let circleName = window.prompt("Add your new Circle")
    const circle = await addCircle(circleName)
    Router.push("/circles/" + circle.id)
    await searchExtras.refetch()
  }
  return (
    <Container>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem colSpan={5}>
          <Heading>Activity</Heading>
        </GridItem>
        <GridItem colSpan={1}>
          <Navbar />
        </GridItem>
        <GridItem rounded="md" boxShadow="xs" colSpan={5} bg="gray.50" color="gray.600">
          <Link href="/blackboard">
            <Text fontSize="2xl">
              <a>Blackboard</a>
            </Text>
          </Link>
        </GridItem>
        <GridItem colSpan={1} bg="gray.70" textAlign="center">
          <Link href="/blackboard">
            <a>
              <Tag size="md" key="md" variant="outline" colorScheme="gray" bg="green.100">
                <TagLabel>{notificationCount}</TagLabel>
                <TagRightIcon as={EmailIcon} />
              </Tag>
            </a>
          </Link>
        </GridItem>
        <GridItem rounded="md" boxShadow="xs" colSpan={5} bg="gray.50" color="gray.600">
          <Link href="/contacts">
            <Text fontSize="2xl">
              <a>My Contacts</a>
            </Text>
          </Link>
        </GridItem>
        <GridItem colSpan={1} textAlign="center">
          <Link href="/contacts">
            <a>
              <IconButton icon={<ArrowRightIcon />} aria-label="Jump to contacts" />
            </a>
          </Link>
        </GridItem>
        <GridItem rounded="md" boxShadow="xs" colSpan={5} bg="gray.50" color="gray.600">
          <Text fontSize="2xl">My Circles</Text>
        </GridItem>
        <GridItem colSpan={1} textAlign="center">
          <IconButton icon={<AddIcon />} aria-label="Create circle" onClick={addCircleOnClick} />
        </GridItem>
        {userCircles.map((circle) => {
          return (
            <GridItem colSpan={5}>
              <Link href={"/circles/" + circle.id}>
                <a>{circle.name}</a>
              </Link>
            </GridItem>
          )
        })}
      </Grid>
    </Container>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
