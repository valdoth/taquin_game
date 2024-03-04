import 'package:flutter/material.dart';

class ResetButton extends StatelessWidget {
  var reset;

  ResetButton(this.reset, {super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      onPressed: reset,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(30),
      ),
      child: const Text("Shuffle"),
    );
  }
}
