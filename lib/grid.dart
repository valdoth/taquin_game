import 'package:flutter/material.dart';
import 'package:taquin/grid_button.dart';

class Grid extends StatelessWidget {
  final List<int> numbers;
  final Size size;
  Function clickGrid;

  Grid(this.numbers, this.size, this.clickGrid, {super.key});

  @override
  Widget build(BuildContext context) {
    double height = size.height;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: SizedBox(
        height: height * 0.50,
        child: GridView.builder(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            mainAxisSpacing: 3,
            crossAxisSpacing: 3,
          ),
          itemCount: numbers.length,
          itemBuilder: (context, index) {
            return numbers[index] != 0
                ? GridButton("${numbers[index]}", () {
                    clickGrid(index);
                  })
                : const SizedBox.shrink();
          },
        ),
      ),
    );
  }
}
