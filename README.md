Project Overview
Description
This JavaScript/TypeScript project offers a detailed simulation of a building with multiple floors and elevators. Through meticulously designed classes, it facilitates the management, control, and simulation of elevator movements and interactions within the building environment.

Classes
Building
The central orchestrator, managing the overarching structure and properties of the building. This includes overseeing the number of floors and elevators present.

Floor
Representing individual floors within the building, this class handles crucial properties such as floor number and interactions with elevators.

Elevator (Abstract Class)
An abstract class governing the behavior and movement of each elevator. It encapsulates essential functionalities such as tracking the current position and servicing floor requests. Subclasses, namely LowerElevator, MiddleElevator, and UpperElevator, extend this class to specify elevator types and their respective starting positions within the building.

LowerElevator, MiddleElevator, UpperElevator
These subclasses inherit from the Elevator abstract class, each starting at a designated part of the building—lower, middle, or upper floors.

ElevatorFactory
Responsible for the dynamic creation of elevator instances. This factory class streamlines the process by abstracting away the creation logic, ensuring that each elevator is appropriately initialized according to its designated location within the building.

Elevator Algorithm: SCAN
Efficiently locates the nearest available elevator to respond to a floor's call using a systematic approach:

Initialization: Calculate the time for each available elevator to reach the calling floor.

Calculation: Assess the current position and existing destinations of each elevator to compute the travel time based on distance and remaining tasks.

Selection: Choose the elevator with the shortest calculated time as the nearest responder.

Timer Start: Initiate a timer upon selecting the nearest elevator to simulate its arrival time.

Initial Setup
During building initialization, each elevator type (Lower, Middle, Upper) is strategically positioned across different parts of the building:

LowerElevator: Commences operation from the lower floors.
MiddleElevator: Initiates service from the middle floors.
UpperElevator: Starts its journey from the upper floors.
This meticulous setup ensures optimal coverage and efficiency in serving various parts of the building.

